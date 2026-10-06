import express from "express";
import {
  createApplication,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
  getJobApplications,
} from "../controllers/application.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("candidate"),
  createApplication,
);

router.get(
  "/my-applications",
  protect,
  authorize("candidate"),
  getMyApplications,
);

router.get(
  "/job/:jobId",
  protect,
  authorize("employer"),
  getJobApplications,
);

router.get(
  "/:id",
  protect,
  authorize("candidate", "employer"),
  getApplicationById,
);

router.patch(
  "/:id/status",
  protect,
  authorize("employer"),
  updateApplicationStatus,
);

export default router;
