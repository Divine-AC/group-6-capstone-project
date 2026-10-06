import express from "express";
import {
  getDashboard,
  getUsers,
  getJobs,
  getApplications,
  getReports,
  updateUser,
  deleteUser,
  deleteJob,
} from "../controllers/admin.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

router.use(protect, authorize("admin"));

router.get("/dashboard", getDashboard);
router.get("/users", getUsers);
router.get("/jobs", getJobs);
router.get("/applications", getApplications);
router.patch("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.delete("/jobs/:id", deleteJob);
router.get("/reports", getReports);


export default router;