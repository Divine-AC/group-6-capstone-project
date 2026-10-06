import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

export const registerUserService = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    companyName,
    location,
    experienceLevel,
    desiredRole,
  } = userData;

  const normalizedEmail = email?.trim().toLowerCase();

  if (!normalizedEmail) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const allowedRoles = ["candidate", "employer"];

  if (role && !allowedRoles.includes(role)) {
    const error = new Error("Invalid registration role");
    error.statusCode = 400;
    throw error;
  }

  const userRole = role || "candidate";

  const existingUser = await User.findOne({ email: normalizedEmail });

  if (existingUser) {
    const error = new Error("User with this email already exists");
    error.statusCode = 409;
    throw error;
  }

  if (userRole === "employer" && !companyName?.trim()) {
    const error = new Error("Company name is required for employer accounts");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({
    firstName: firstName?.trim(),
    lastName: lastName?.trim(),
    email: normalizedEmail,
    password,
    role: userRole,
    companyName:
      userRole === "employer" ? companyName.trim() : undefined,
    location: location?.trim() || "",
    experienceLevel: experienceLevel || "",
    desiredRole: desiredRole?.trim() || "",
  });

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      ...(user.role === "employer" && {
        companyName: user.companyName,
      }),
      location: user.location,
      experienceLevel: user.experienceLevel,
      desiredRole: user.desiredRole,
    },
    token,
  };
};

export const loginUserService = async (email, password) => {
  const normalizedEmail = email?.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select(
    "+password",
  );

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user._id, user.role);

  return {
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      ...(user.role === "employer" && {
        companyName: user.companyName,
      }),
      location: user.location,
      experienceLevel: user.experienceLevel,
      desiredRole: user.desiredRole,
    },
    token,
  };
};

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
    ...(user.role === "employer" && {
      companyName: user.companyName,
    }),
    phone: user.phone,
    location: user.location,
    experienceLevel: user.experienceLevel,
    desiredRole: user.desiredRole,
    profilePicture: user.profilePicture,
    resume: user.resume,
  };
};

