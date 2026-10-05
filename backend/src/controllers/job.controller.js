import {
  createJobService,
  getAllJobsService,
  getJobByIdService,
  updateJobService,
  deleteJobService,
} from '../services/job.service.js';

// POST /api/jobs
export const createJob = async (req, res, next) => {
  try {
    const job = await createJobService(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs
export const getJobs = async (req, res, next) => {
  try {
    const result = await getAllJobsService(req.query);
    res.status(200).json({
      success: true,
      data: result.jobs,
      pagination: {
        totalJobs: result.totalJobs,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/jobs/:id
export const getJob = async (req, res, next) => {
  try {
    const job = await getJobByIdService(req.params.id);
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/jobs/:id
export const updateJob = async (req, res, next) => {
  try {
    const updatedJob = await updateJobService(
      req.params.id,
      req.body,
      req.user,
    );
    res.status(200).json({
      success: true,
      message: 'Job posting updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/jobs/:id
export const deleteJob = async (req, res, next) => {
  try {
    const result = await deleteJobService(req.params.id, req.user);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
