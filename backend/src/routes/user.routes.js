import express from "express";
import {
  getProfile,
  updateProfile,
  uploadResume,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import uploadResumeFile from "../middleware/upload.middleware.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.patch("/profile", protect, updateProfile);
router.post(
  "/profile/resume",
  protect,
  uploadResumeFile.single("resume"),
  uploadResume,
);

export default router;
