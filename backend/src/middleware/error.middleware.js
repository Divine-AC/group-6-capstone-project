/**
 * Global Error Handling Middleware
 * Express recognizes this as an error handler because it has 4 parameters: (err, req, res, next)
 */
import ApiError from '../utils/ApiError.js';

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.statusCode || 500;

  // 1. Mongoose Invalid ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found. Invalid field value for: ${err.path}`;
    error = new ApiError(400, message);
  }

  // 2. Mongoose Duplicate Key Error (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `Duplicate value entered for '${field}' field. Please use another value.`;
    error = new ApiError(409, message);
  }

  // 3. Mongoose Schema Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    const message = `Invalid input data: ${messages.join('. ')}`;
    error = new ApiError(400, message);
  }

  // 4. JWT Authentication Errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(
      401,
      'Invalid authentication token. Please log in again.',
    );
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Your session has expired. Please log in again.');
  }

  // Final JSON Response Construction
  const statusCode = error.statusCode || 500;
  const responsePayload = {
    success: false,
    message: error.message || 'Internal Server Error',
  };

  // Attach stack traces only during non-production environments
  if (process.env.NODE_ENV === 'development') {
    responsePayload.stack = err.stack;
  }

  res.status(statusCode).json(responsePayload);
};

export default errorHandler;
