import Job from '../models/Job.js';

/**
 * Job Service — Business Logic for Job Operations
 */

// 1. Create a new Job Posting
export const createJobService = async (jobData, employerId) => {
  // Always assign employer ID from authenticated session, never trust request body
  const job = await Job.create({
    ...jobData,
    employer: employerId,
  });
  return job;
};

// 2. Fetch All Jobs with Filtering, Keyword Search, & Pagination
export const getAllJobsService = async (queryParams) => {
  const {
    search,
    location,
    jobType,
    status,
    page = 1,
    limit = 10,
  } = queryParams;

  // Build dynamic MongoDB query object
  const query = {};

  // Default to active jobs unless explicitly requesting closed ones
  query.status = status || 'active';

  if (jobType) {
    query.jobType = jobType;
  }

  // Case-insensitive regex match for location (e.g., "lagos" matches "Lagos")
  if (location) {
    query.location = { $regex: location, $options: 'i' };
  }

  // Text index search across title, company, description
  if (search) {
    query.$text = { $search: search };
  }

  // Calculate pagination offset
  const skip = (page - 1) * limit;

  // Run database query and count concurrently
  const [jobs, totalJobs] = await Promise.all([
    Job.find(query)
      .populate('employer', 'name email companyName') // Retrieve specific fields from User model
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(Number(limit)),
    Job.countDocuments(query),
  ]);

  return {
    jobs,
    totalJobs,
    totalPages: Math.ceil(totalJobs / limit),
    currentPage: Number(page),
  };
};

// 3. Fetch Single Job by ID
export const getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId).populate(
    'employer',
    'name email companyName',
  );

  if (!job) {
    const error = new Error('Job posting not found');
    error.statusCode = 404;
    throw error;
  }

  return job;
};

// 4. Update Job Posting (Includes Ownership Check)
export const updateJobService = async (jobId, updateData, user) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error('Job posting not found');
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check: User must be the job's employer OR an admin
  if (job.employer.toString() !== user.id && user.role !== 'admin') {
    const error = new Error(
      'Forbidden: You can only edit your own job postings',
    );
    error.statusCode = 403;
    throw error;
  }

  const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validations on update
  });

  return updatedJob;
};

// 5. Delete Job Posting (Includes Ownership Check)
export const deleteJobService = async (jobId, user) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error('Job posting not found');
    error.statusCode = 404;
    throw error;
  }

  // Ownership Check: User must be the job's employer OR an admin
  if (job.employer.toString() !== user.id && user.role !== 'admin') {
    const error = new Error(
      'Forbidden: You can only delete your own job postings',
    );
    error.statusCode = 403;
    throw error;
  }

  await job.deleteOne();
  return { message: 'Job posting deleted successfully' };
};
