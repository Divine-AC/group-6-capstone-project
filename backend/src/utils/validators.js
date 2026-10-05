import { body, param, validationResult } from 'express-validator';

// Generic Middleware to catch validation errors and return 400 Bad Request
export const validate = (validations) => {
  return async (req, res, next) => {
    // Run all validation chains
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  };
};

// Define the validation rules for registration
export const validateRegister = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),

  // Check for validation errors BEFORE proceeding
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Rejects immediately with 400 Bad Request!
      // The controller, service, and MongoDB are NEVER touched.
      return res.status(400).json({ errors: errors.array() });
    }
    next(); // Valid input! Move to controller/service layer
  },
];

/* ==========================================================================
   Member 5: Job Validation Schemas
   ========================================================================== */

export const createJobSchema = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('description').notEmpty().withMessage('Job description is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('location').trim().notEmpty().withMessage('Location is required'),
  body('jobType')
    .isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
    .withMessage(
      'Valid job type required (full-time, part-time, contract, internship, remote)',
    ),
  body('requirements')
    .optional()
    .isArray()
    .withMessage('Requirements must be an array of strings'),
  body('deadline')
    .optional()
    .isISO8601()
    .withMessage('Deadline must be a valid date format (YYYY-MM-DD)'),
];

export const updateJobSchema = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('jobType')
    .optional()
    .isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
    .withMessage('Invalid job type'),
  body('status')
    .optional()
    .isIn(['active', 'closed'])
    .withMessage('Status must be either active or closed'),
];

/* 
   Member 6: Application Validation Schemas
 */

// 1. Candidate applying for a job
export const applyForJobSchema = [
  body('job')
    .notEmpty()
    .withMessage('Job ID is required')
    .isMongoId()
    .withMessage('Invalid Mongo Job ID format'),
  body('coverLetter')
    .optional()
    .trim()
    .isLength({ max: 2000 })
    .withMessage('Cover letter cannot exceed 2000 characters'),
  body('resumeUrl')
    .optional()
    .isURL()
    .withMessage('Resume URL must be a valid URL string'),
];

// 2. Employer updating an application's status
export const updateApplicationStatusSchema = [
  param('id').isMongoId().withMessage('Invalid Application ID format'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['applied', 'reviewed', 'shortlisted', 'rejected', 'accepted'])
    .withMessage('Invalid application status'),
];
