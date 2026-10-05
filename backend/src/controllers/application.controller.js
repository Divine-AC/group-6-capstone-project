import {
  applyForJobService,
  getApplicationsService,
  getApplicationByIdService,
  updateApplicationStatusService,
} from '../services/application.service.js';

// POST /api/applications
export const applyForJob = async (req, res, next) => {
  try {
    const application = await applyForJobService(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications
export const getApplications = async (req, res, next) => {
  try {
    const result = await getApplicationsService(req.user, req.query);
    res.status(200).json({
      success: true,
      data: result.applications,
      pagination: {
        totalApplications: result.totalApplications,
        totalPages: result.totalPages,
        currentPage: result.currentPage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/applications/:id
export const getApplicationById = async (req, res, next) => {
  try {
    const application = await getApplicationByIdService(
      req.params.id,
      req.user,
    );
    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/applications/:id/status
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const updatedApplication = await updateApplicationStatusService(
      req.params.id,
      req.body.status,
      req.user,
    );
    res.status(200).json({
      success: true,
      message: 'Application status updated successfully',
      data: updatedApplication,
    });
  } catch (error) {
    next(error);
  }
};
