import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    salary: {
      type: String,
      trim: true, // e.g., "₦200,000 - ₦300,000" or numeric string
    },
    jobType: {
      type: String,
      required: [true, 'Job type is required'],
      enum: {
        values: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
        message: '{VALUE} is not a valid job type',
      },
    },
    requirements: {
      type: [String],
      default: [],
    },
    deadline: {
      type: Date,
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Establishes relationship to User model
      required: [true, 'Employer reference is required'],
    },
    status: {
      type: String,
      enum: ['active', 'closed'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  },
);

// MongoDB Indexes for high-performance search and filtering
jobSchema.index({ title: 'text', company: 'text', description: 'text' });
jobSchema.index({ location: 1 });
jobSchema.index({ jobType: 1 });
jobSchema.index({ status: 1 });

const Job = mongoose.model('Job', jobSchema);
export default Job;
