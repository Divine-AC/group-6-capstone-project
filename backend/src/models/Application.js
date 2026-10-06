import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: [true, "Job is required"],
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Candidate is required"],
    },

    coverLetter: {
      type: String,
      required: [true, "Cover letter is required"],
      trim: true,
    },

    resume: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "pending",
        "reviewing",
        "shortlisted",
        "rejected",
        "accepted",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index(
  { job: 1, candidate: 1 },
  { unique: true },
);

export default mongoose.model("Application", applicationSchema);