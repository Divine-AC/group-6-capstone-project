import express from 'express';
import {
  applyForJob,
  getApplications,
  getApplicationById,
  updateApplicationStatus,
} from '../controllers/application.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  validate,
  applyForJobSchema,
  updateApplicationStatusSchema,
} from '../utils/validators.js';

const router = express.Router();

// All application endpoints require an authenticated user
router.use(protect);

// 1. Submit application (Candidates only)
router.post(
  '/',
  authorize('candidate'),
  validate(applyForJobSchema),
  applyForJob,
);

// 2. Fetch applications list (Candidates, Employers, Admins - filtered inside service)
router.get('/', getApplications);

// 3. Fetch single application detail by ID
router.get('/:id', getApplicationById);

// 4. Update status (Employers & Admins only)
router.patch(
  '/:id/status',
  authorize('employer', 'admin'),
  validate(updateApplicationStatusSchema),
  updateApplicationStatus,
);

export default router;
