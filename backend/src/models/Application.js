import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job ID reference is required'],
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant ID reference is required'],
    },
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Employer ID reference is required'],
    },
    coverLetter: {
      type: String,
      trim: true,
      maxlength: [2000, 'Cover letter cannot exceed 2000 characters'],
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ['applied', 'reviewed', 'shortlisted', 'rejected', 'accepted'],
        message: '{VALUE} is not a valid application status',
      },
      default: 'applied',
    },
  },
  {
    timestamps: true,
  },
);

// Compound Unique Index: Prevents a candidate from applying to the same job multiple times
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Secondary Indexes for rapid lookups
applicationSchema.index({ applicant: 1 });
applicationSchema.index({ employer: 1 });
applicationSchema.index({ status: 1 });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
