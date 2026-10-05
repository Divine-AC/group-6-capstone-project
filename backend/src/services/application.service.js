import Application from '../models/Application.js';
import Job from '../models/Job.js';

/**
 * Application Service — Business Logic for Job Applications
 */

// 1. Submit a Job Application (Candidate)
export const applyForJobService = async (applicationData, candidateId) => {
  const { job: jobId, coverLetter, resumeUrl } = applicationData;

  // Verify the job posting exists
  const job = await Job.findById(jobId);
  if (!job) {
    const error = new Error('Job posting not found');
    error.statusCode = 404;
    throw error;
  }

  // Business Rule: Cannot apply to a closed job
  if (job.status === 'closed') {
    const error = new Error('Cannot apply to a closed job posting');
    error.statusCode = 400;
    throw error;
  }

  // Business Rule: Employers cannot apply to their own job postings
  if (job.employer.toString() === candidateId) {
    const error = new Error(
      'Employers cannot submit applications to their own postings',
    );
    error.statusCode = 400;
    throw error;
  }

  // Check for duplicate application
  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: candidateId,
  });

  if (existingApplication) {
    throw new ApiError(409, 'You have already applied for this job posting');
  }

  // Create application linking candidate, job, and posting employer
  const application = await Application.create({
    job: jobId,
    applicant: candidateId,
    employer: job.employer,
    coverLetter,
    resumeUrl,
  });

  return application;
};

// 2. Fetch Applications (Role-Based Filtering)
export const getApplicationsService = async (user, queryParams) => {
  const { jobId, status, page = 1, limit = 10 } = queryParams;
  const query = {};

  // Role Routing: Candidates see their applications; Employers see applications for their jobs
  if (user.role === 'candidate') {
    query.applicant = user.id;
  } else if (user.role === 'employer') {
    query.employer = user.id;
  }

  if (jobId) {
    query.job = jobId;
  }

  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const [applications, totalApplications] = await Promise.all([
    Application.find(query)
      .populate('job', 'title company location jobType status')
      .populate('applicant', 'name email profile')
      .populate('employer', 'name companyName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit)),
    Application.countDocuments(query),
  ]);

  return {
    applications,
    totalApplications,
    totalPages: Math.ceil(totalApplications / limit),
    currentPage: Number(page),
  };
};

// 3. Fetch Single Application by ID (With Access Control)
export const getApplicationByIdService = async (applicationId, user) => {
  const application = await Application.findById(applicationId)
    .populate('job', 'title company location salary jobType')
    .populate('applicant', 'name email profile')
    .populate('employer', 'name companyName');

  if (!application) {
    const error = new Error('Application record not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization Check: Only the applicant, job employer, or an admin can view details
  const isApplicant = application.applicant._id.toString() === user.id;
  const isEmployer = application.employer._id.toString() === user.id;
  const isAdmin = user.role === 'admin';

  if (!isApplicant && !isEmployer && !isAdmin) {
    const error = new Error(
      'Forbidden: You do not have permission to view this application',
    );
    error.statusCode = 403;
    throw error;
  }

  return application;
};

// 4. Update Application Status (Employer / Admin Only)
export const updateApplicationStatusService = async (
  applicationId,
  status,
  user,
) => {
  const application = await Application.findById(applicationId);

  if (!application) {
    const error = new Error('Application record not found');
    error.statusCode = 404;
    throw error;
  }

  // Authorization Check: Only the employer who posted the job (or admin) can update status
  const isEmployer = application.employer.toString() === user.id;
  const isAdmin = user.role === 'admin';

  if (!isEmployer && !isAdmin) {
    const error = new Error(
      'Forbidden: Only the job employer can update application status',
    );
    error.statusCode = 403;
    throw error;
  }

  application.status = status;
  await application.save();

  return application;
};
