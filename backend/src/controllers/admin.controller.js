import {
  getAdminDashboardService,
  getAllUsersService,
  updateUserService,
  deleteUserService,
  getAllJobsService,
  deleteJobService,
  getAllApplicationsService,
  getAdminReportsService,
} from "../services/admin.service.js";
export const getDashboard = async (req, res, next) => {
  try {
    const dashboard = await getAdminDashboardService();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserService(
      req.params.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await deleteUserService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getJobs = async (req, res, next) => {
  try {
    const jobs = await getAllJobsService();

    return res.status(200).json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const result = await deleteJobService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const getApplications = async (req, res, next) => {
  try {
    const applications = await getAllApplicationsService();

    return res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};
export const getReports = async (req, res, next) => {
  try {
    const reports = await getAdminReportsService();

    return res.status(200).json({
      success: true,
      data: reports,
    });
  } catch (error) {
    next(error);
  }
};