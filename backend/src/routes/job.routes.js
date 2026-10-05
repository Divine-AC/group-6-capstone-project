import express from 'express';
import {
  createJob,
  getJobs,
  getJob,
  updateJob,
  deleteJob,
} from '../controllers/job.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import {
  validate,
  createJobSchema,
  updateJobSchema,
} from '../utils/validators.js';

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJob);

router.post(
  '/',
  protect,
  authorize('employer', 'admin'),
  validate(createJobSchema), // Runs schema validation cleanly
  createJob,
);

router.patch(
  '/:id',
  protect,
  authorize('employer', 'admin'),
  validate(updateJobSchema),
  updateJob,
);

router.delete('/:id', protect, authorize('employer', 'admin'), deleteJob);

export default router;
