import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function ApplicationDetails() {
  const { id } = useParams();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/applications/${id}`);
        setApplication(response.data.data);
      } catch (err) {
        setError(
          (err.response &&
            err.response.data &&
            err.response.data.message) ||
            "Unable to load application details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Loading application...</h3>
          <p>We're fetching your application details.</p>
        </div>
      </main>
    );
  }

  if (error || !application) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Unable to load application</h3>
          <p>{error || "Application not found."}</p>

          <Link to="/applications" className="view-job-btn">
            Back to applications
          </Link>
        </div>
      </main>
    );
  }

  const job = application.job;

  const companyName =
    (job && job.employer && job.employer.companyName) ||
    "Company";

  const jobTitle =
    (job && job.title) || "Job unavailable";

  const status =
    application.status || "pending";

  const applicationDate = new Date(
    application.createdAt,
  ).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <Link
          to="/applications"
          className="job-details-back"
        >
          ← Back to applications
        </Link>

        <section className="job-details-header">
          <div className="company-logo large">
            {companyName.charAt(0).toUpperCase()}
          </div>

          <div className="job-details-title">
            <span className="section-eyebrow">
              APPLICATION
            </span>

            <h1>{jobTitle}</h1>

            <p>{companyName}</p>
          </div>
        </section>

        <div className="job-details-content">
          <section className="job-details-main">
            <div className="job-details-section">
              <h2>Application status</h2>

              <p>
                <strong>
                  {status.charAt(0).toUpperCase() +
                    status.slice(1)}
                </strong>
              </p>
            </div>

            <div className="job-details-section">
              <h2>Your cover letter</h2>

              <p>{application.coverLetter}</p>
            </div>

            <div className="job-details-section">
              <h2>Application date</h2>

              <p>{applicationDate}</p>
            </div>
          </section>

          <aside className="job-details-sidebar">
            <div className="job-summary-card">
              <h2>Job summary</h2>

              <div className="job-summary-item">
                <span>Company</span>
                <strong>{companyName}</strong>
              </div>

              <div className="job-summary-item">
                <span>Location</span>
                <strong>
                  {(job && job.location) ||
                    "Not specified"}
                </strong>
              </div>

              <div className="job-summary-item">
                <span>Job type</span>
                <strong>
                  {(job && job.jobType) ||
                    "Not specified"}
                </strong>
              </div>

              <div className="job-summary-item">
                <span>Work mode</span>
                <strong>
                  {(job && job.workMode) ||
                    "Not specified"}
                </strong>
              </div>

              <Link
                to={`/jobs/${job && job._id}`}
                className="view-job-btn"
              >
                View job
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default ApplicationDetails;