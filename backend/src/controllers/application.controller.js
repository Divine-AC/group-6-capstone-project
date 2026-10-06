import {
  createApplicationService,
  getMyApplicationsService,
  getApplicationByIdService,
  updateApplicationStatusService,
  getJobApplicationsService,
} from "../services/application.service.js";

export const createApplication = async (req, res, next) => {
  try {
    const application = await createApplicationService(
      req.body,
      req.user.id,
    );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (req, res, next) => {
  try {
    const applications = await getMyApplicationsService(req.user.id);

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const application = await getApplicationByIdService(
      req.params.id,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Application status is required",
      });
    }

    const application = await updateApplicationStatusService(
      req.params.id,
      req.user.id,
      status,
    );

    return res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobApplications = async (req, res, next) => {
  try {
    const applications = await getJobApplicationsService(
      req.params.jobId,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};