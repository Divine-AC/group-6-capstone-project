import Job from "../models/Job.js";
import User from "../models/User.js";

export const createJobService = async (jobData, employerId) => {
  const employer = await User.findById(employerId);

  if (!employer) {
    const error = new Error("Employer not found");
    error.statusCode = 404;
    throw error;
  }

  if (employer.role !== "employer") {
    const error = new Error("Only employers can create jobs");
    error.statusCode = 403;
    throw error;
  }

  const job = await Job.create({
    ...jobData,
    employer: employerId, workMode: jobData.workMode,
  });

  return job;
};

export const getJobsService = async (filters = {}) => {
  const query = {};

  if (filters.category) {
    query.category = filters.category;
  }

  if (filters.location) {
    query.location = {
      $regex: filters.location,
      $options: "i",
    };
  }

  if (filters.jobType) {
    query.jobType = filters.jobType;
  }
  if (filters.workMode) {
  query.workMode = filters.workMode;
}
if (filters.datePosted) {
  const now = new Date();
  const days = Number(filters.datePosted);

  if (!Number.isNaN(days) && days > 0) {
    const dateFrom = new Date(now);
    dateFrom.setDate(dateFrom.getDate() - days);

    query.createdAt = {
      $gte: dateFrom,
    };
  }
}

  if (filters.experienceLevel) {
    query.experienceLevel = filters.experienceLevel;
  }

  if (filters.search) {
    query.$or = [
      {
        title: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: filters.search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: filters.search,
          $options: "i",
        },
      },
    ];
  }

  const jobs = await Job.find(query)
    .populate("employer", "firstName lastName companyName")
    .sort({ createdAt: -1 });

  return jobs;
};

export const getJobByIdService = async (jobId) => {
  const job = await Job.findById(jobId).populate(
    "employer",
    "firstName lastName companyName",
  );

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  return job;
};

export const updateJobService = async (
  jobId,
  employerId,
  updateData,
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  if (job.employer.toString() !== employerId.toString()) {
    const error = new Error(
      "You are not authorized to update this job",
    );
    error.statusCode = 403;
    throw error;
  }

  const allowedFields = [
    "title",
    "category",
    "description",
    "location",
    "jobType",
    "workMode",
    "experienceLevel",
    "salaryMin",
    "salaryMax",
    "skills",
    "deadline",
  ];

  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  const updatedJob = await Job.findByIdAndUpdate(
    jobId,
    filteredData,
    {
      new: true,
      runValidators: true,
    },
  ).populate(
    "employer",
    "firstName lastName companyName",
  );

  return updatedJob;
};

export const deleteJobService = async (jobId, employerId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  if (job.employer.toString() !== employerId.toString()) {
    const error = new Error(
      "You are not authorized to delete this job",
    );
    error.statusCode = 403;
    throw error;
  }

  await job.deleteOne();

  return {
    id: job._id,
  };
};