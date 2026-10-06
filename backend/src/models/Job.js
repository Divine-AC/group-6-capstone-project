import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Job category is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
    },

    location: {
      type: String,
      required: [true, "Job location is required"],
      trim: true,
    },

    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      required: [true, "Job type is required"],
    },
    workMode: {
  type: String,
  enum: ["On-site", "Remote", "Hybrid"],
  required: [true, "Work mode is required"],
 },

    experienceLevel: {
      type: String,
      enum: [
        "Entry level",
        "1-2 years",
        "3-4 years",
        "5+ years",
      ],
      required: [true, "Experience level is required"],
    },

    salaryMin: {
      type: Number,
      min: 0,
      default: null,
    },

    salaryMax: {
      type: Number,
      min: 0,
      default: null,
    },

    skills: {
      type: [String],
      default: [],
    },

    deadline: {
      type: Date,
      required: [true, "Application deadline is required"],
    },

    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Employer is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Job", jobSchema);