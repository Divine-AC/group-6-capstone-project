import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";

export const createApplicationService = async (
  applicationData,
  candidateId,
) => {
  const { job, coverLetter, resume } = applicationData;

  const candidate = await User.findById(candidateId);

  if (!candidate) {
    const error = new Error("Candidate not found");
    error.statusCode = 404;
    throw error;
  }

  if (candidate.role !== "candidate") {
    const error = new Error("Only candidates can apply for jobs");
    error.statusCode = 403;
    throw error;
  }

  const jobExists = await Job.findById(job);

  if (!jobExists) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  if (new Date(jobExists.deadline) < new Date()) {
    const error = new Error("Application deadline has passed");
    error.statusCode = 400;
    throw error;
  }

  const existingApplication = await Application.findOne({
    job,
    candidate: candidateId,
  });

  if (existingApplication) {
    const error = new Error("You have already applied for this job");
    error.statusCode = 409;
    throw error;
  }

  const application = await Application.create({
    job,
    candidate: candidateId,
    coverLetter,
    resume: resume || candidate.resume || "",
  });

  return application.populate([
    {
      path: "job",
      populate: {
        path: "employer",
        select: "firstName lastName companyName",
      },
    },
    {
      path: "candidate",
      select: "firstName lastName email phone location resume",
    },
  ]);
};

export const getMyApplicationsService = async (candidateId) => {
  const applications = await Application.find({
    candidate: candidateId,
  })
    .populate({
      path: "job",
      populate: {
        path: "employer",
        select: "firstName lastName companyName",
      },
    })
    .sort({ createdAt: -1 });

  return applications;
};

export const getApplicationByIdService = async (
  applicationId,
  userId,
) => {
  const application = await Application.findById(applicationId)
    .populate({
      path: "job",
      populate: {
        path: "employer",
        select: "firstName lastName companyName",
      },
    })
    .populate(
      "candidate",
      "firstName lastName email phone location resume",
    );

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  const isCandidate =
    application.candidate._id.toString() === userId.toString();

  const isEmployer =
    application.job.employer._id.toString() === userId.toString();

  if (!isCandidate && !isEmployer) {
    const error = new Error(
      "You are not authorized to view this application",
    );
    error.statusCode = 403;
    throw error;
  }

  return application;
};

export const updateApplicationStatusService = async (
  applicationId,
  employerId,
  status,
) => {
  const allowedStatuses = [
    "pending",
    "reviewing",
    "shortlisted",
    "rejected",
    "accepted",
  ];

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Invalid application status");
    error.statusCode = 400;
    throw error;
  }

  const application = await Application.findById(applicationId).populate(
    "job",
    "employer",
  );

  if (!application) {
    const error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  if (application.job.employer.toString() !== employerId.toString()) {
    const error = new Error(
      "You are not authorized to update this application",
    );
    error.statusCode = 403;
    throw error;
  }

  application.status = status;

  await application.save();

  return application.populate([
    {
      path: "job",
      populate: {
        path: "employer",
        select: "firstName lastName companyName",
      },
    },
    {
      path: "candidate",
      select: "firstName lastName email phone location resume",
    },
  ]);
};

  export const getJobApplicationsService = async (
  jobId,
  employerId,
) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  if (job.employer.toString() !== employerId.toString()) {
    const error = new Error(
      "You are not authorized to view applications for this job",
    );
    error.statusCode = 403;
    throw error;
  }

  const applications = await Application.find({
    job: jobId,
  })
    .populate(
      "candidate",
      "firstName lastName email phone location resume",
    )
    .populate({
      path: "job",
      select: "title category location jobType experienceLevel",
    })
    .sort({ createdAt: -1 });

  return applications;
};