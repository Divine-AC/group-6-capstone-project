import {
  createJobService,
  getJobsService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
} from "../services/job.service.js";

export const createJob = async (req, res, next) => {
  try {
    const job = await createJobService(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await getJobsService(req.query);

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await getJobByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const job = await updateJobService(
      req.params.id,
      req.user.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const result = await deleteJobService(
      req.params.id,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};