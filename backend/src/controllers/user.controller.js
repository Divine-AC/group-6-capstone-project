import {
  getUserProfileService,
  updateUserProfileService,
} from "../services/user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await getUserProfileService(req.user.id);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await updateUserProfileService(
      req.user.id,
      req.body,
    );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      const error = new Error("Please select a resume file to upload.");
      error.statusCode = 400;
      throw error;
    }

    const resumePath = `/uploads/resumes/${req.file.filename}`;

    const user = await updateUserProfileService(req.user.id, {
      resume: resumePath,
    });

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
