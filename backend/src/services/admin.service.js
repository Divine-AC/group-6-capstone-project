import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

export const getAdminDashboardService = async () => {
  const [users, jobs, applications] = await Promise.all([
    User.countDocuments(),
    Job.countDocuments(),
    Application.countDocuments(),
  ]);

  const candidates = await User.countDocuments({
    role: "candidate",
  });

  const employers = await User.countDocuments({
    role: "employer",
  });

  const admins = await User.countDocuments({
    role: "admin",
  });

  return {
    users,
    candidates,
    employers,
    admins,
    jobs,
    applications,
  };
};

export const getAllUsersService = async () => {
  return await User.find()
    .select("-password")
    .sort({ createdAt: -1 });
};

export const updateUserService = async (userId, updateData) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const allowedFields = [
    "firstName",
    "lastName",
    "role",
    "phone",
    "location",
    "experienceLevel",
    "desiredRole",
    "companyName",
    "profilePicture",
    "resume",
  ];

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      user[field] = updateData[field];
    }
  }

  if (updateData.isActive !== undefined) {
    user.isActive = updateData.isActive;
  }

  await user.save();

  return user.toObject();
};

export const deleteUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  await user.deleteOne();

  return {
    id: user._id,
  };
};

export const getAllJobsService = async () => {
  return await Job.find()
    .populate(
      "employer",
      "firstName lastName email companyName",
    )
    .sort({ createdAt: -1 });
};

export const deleteJobService = async (jobId) => {
  const job = await Job.findById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.statusCode = 404;
    throw error;
  }

  await job.deleteOne();

  return {
    id: job._id,
  };
};

export const getAllApplicationsService = async () => {
  return await Application.find()
    .populate(
      "candidate",
      "firstName lastName email phone location",
    )
    .populate({
      path: "job",
      select: "title category location jobType experienceLevel",
      populate: {
        path: "employer",
        select: "firstName lastName email companyName",
      },
    })
    .sort({ createdAt: -1 });
};

export const getAdminReportsService = async () => {
  const [usersByRole, jobsByCategory, applicationsByStatus] =
    await Promise.all([
      User.aggregate([
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),

      Job.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),

      Application.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]),
    ]);

  return {
    usersByRole,
    jobsByCategory,
    applicationsByStatus,
  };
};