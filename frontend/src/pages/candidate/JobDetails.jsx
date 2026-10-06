import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load this job. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <div className="jobs-empty">
            <h3>Loading job details...</h3>
            <p>We're fetching the job information.</p>
          </div>
        </div>
      </main>
    );
  }

  if (error || !job) {
    return (
      <main className="job-details-page">
        <div className="job-details-container">
          <div className="jobs-empty">
            <h3>Unable to load job</h3>
            <p>{error || "This job could not be found."}</p>
            <Link to="/jobs" className="view-job-btn">
              Back to Jobs
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const companyName = job.employer?.companyName || "Company";

  const salary =
    job.salaryMin != null && job.salaryMax != null
      ? `₦${job.salaryMin.toLocaleString()} - ₦${job.salaryMax.toLocaleString()}`
      : job.salaryMin != null
        ? `From ₦${job.salaryMin.toLocaleString()}`
        : job.salaryMax != null
          ? `Up to ₦${job.salaryMax.toLocaleString()}`
          : "Salary not specified";

  const postedDate = new Date(job.createdAt);

  const formattedDate = Number.isNaN(postedDate.getTime())
    ? "Recently"
    : postedDate.toLocaleDateString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <button
          type="button"
          className="job-details-back"
          onClick={() => navigate("/jobs")}
        >
          ← Back
        </button>

        <section className="job-details-header">
          <div className="company-logo large">
            {companyName.charAt(0).toUpperCase()}
          </div>

          <div className="job-details-title">
            <span className="section-eyebrow">{job.category}</span>

            <h1>{job.title}</h1>

            <p>{companyName}</p>
          </div>
        </section>

        <div className="job-details-content">
          <section className="job-details-main">
            <div className="job-details-meta">
              <span>{job.location}</span>
              <span>{job.jobType}</span>
              <span>{job.workMode}</span>
              <span>{job.experienceLevel}</span>
            </div>

            <div className="job-details-section">
              <h2>About the role</h2>
              <p>{job.description}</p>
            </div>

            {job.skills?.length > 0 && (
              <div className="job-details-section">
                <h2>Skills</h2>

                <div className="job-tags">
                  {job.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="job-details-section">
              <h2>Application deadline</h2>
              <p>
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString("en-NG", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "No deadline specified"}
              </p>
            </div>
          </section>

          <aside className="job-details-sidebar">
            <div className="job-summary-card">
              <h2>Job summary</h2>

              <div className="job-summary-item">
                <span>Salary</span>
                <strong>{salary}</strong>
              </div>

              <div className="job-summary-item">
                <span>Job type</span>
                <strong>{job.jobType}</strong>
              </div>

              <div className="job-summary-item">
                <span>Work mode</span>
                <strong>{job.workMode}</strong>
              </div>

              <div className="job-summary-item">
                <span>Experience</span>
                <strong>{job.experienceLevel}</strong>
              </div>

              <div className="job-summary-item">
                <span>Posted</span>
                <strong>{formattedDate}</strong>
              </div>

              <Link
                to={`/jobs/${job._id}/apply`}
                className="apply-job-btn"
              >
                Apply for this job
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default JobDetails;
