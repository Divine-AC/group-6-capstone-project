import User from "../models/User.js";

export const getUserProfileService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};

export const updateUserProfileService = async (
  userId,
  updateData,
) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "phone",
    "location",
    "experienceLevel",
    "desiredRole",
    "profilePicture",
    "resume",
    "companyName",
  ];

  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    filteredData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return user;
};