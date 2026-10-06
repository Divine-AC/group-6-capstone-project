import { Link } from "react-router-dom";

function JobCard({ job, isSaved, onToggleSave }) {
  const postedDate = new Date(job.createdAt);

  const formattedDate = Number.isNaN(postedDate.getTime())
    ? "Recently"
    : postedDate.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  const companyName = job.employer?.companyName || "Company";
  const salary =
    job.salaryMin != null && job.salaryMax != null
      ? `₦${job.salaryMin.toLocaleString()} - ₦${job.salaryMax.toLocaleString()}`
      : job.salaryMin != null
        ? `From ₦${job.salaryMin.toLocaleString()}`
        : job.salaryMax != null
          ? `Up to ₦${job.salaryMax.toLocaleString()}`
          : "Salary not specified";

  return (
    <article className="job-card">
      <div className="job-card-top">
        <div className="company-logo">
          {companyName.charAt(0).toUpperCase() || "J"}
        </div>

        <div className="job-card-heading">
          <h3>{job.title}</h3>
          <p>{companyName}</p>
        </div>

        <button
          type="button"
          className={`save-job-btn ${isSaved ? "saved" : ""}`}
          onClick={() => onToggleSave(job._id)}
          aria-label={
            isSaved
              ? `Unsave ${job.title}`
              : `Save ${job.title}`
          }
        >
          {isSaved ? "♥" : "♡"}
        </button>
      </div>

      <div className="job-meta">
        <span>{job.location}</span>
        <span>{job.jobType}</span>
        <span>{job.workMode}</span>
      </div>

      <div className="job-tags">
        <span>{job.category}</span>
        <span>{job.experienceLevel}</span>
      </div>

      <p className="job-description">{job.description}</p>

      <div className="job-card-bottom">
        <div>
          <strong>{salary}</strong>
          <small>Posted {formattedDate}</small>
        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="view-job-btn"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}

export default JobCard;
