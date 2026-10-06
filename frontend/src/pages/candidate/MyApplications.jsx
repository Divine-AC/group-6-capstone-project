import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/applications/my-applications");
        setApplications(response.data.data || []);
      } catch (err) {
        setError(
          (err.response && err.response.data && err.response.data.message) ||
            "Unable to load your applications.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Loading applications...</h3>
          <p>We're fetching your applications.</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Unable to load applications</h3>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="jobs-page">
      <section className="jobs-hero">
        <div className="jobs-hero-content">
          <span className="section-eyebrow">MY APPLICATIONS</span>

          <h1>Track your applications</h1>

          <p>
            View the jobs you've applied for and keep track of their status.
          </p>
        </div>
      </section>

      <div className="jobs-container">
        {applications.length === 0 ? (
          <div className="jobs-empty">
            <h3>No applications yet</h3>

            <p>You haven't applied for any jobs yet.</p>

            <Link to="/jobs" className="view-job-btn">
              Browse jobs
            </Link>
          </div>
        ) : (
          <div className="jobs-results">
            {applications.map((application) => {
              const job = application.job;
              const companyName =
                (job && job.employer && job.employer.companyName) ||
                "Company";

              const jobTitle =
                (job && job.title) || "Job unavailable";

              const location =
                (job && job.location) || "Location not specified";

              const jobType =
                (job && job.jobType) || "Job type not specified";

              const category =
                (job && job.category) || "Job";

              return (
                <article className="job-card" key={application._id}>
                  <div className="job-card-heading">
                    <div className="company-logo">
                      {companyName.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <span className="section-eyebrow">
                        {category}
                      </span>

                      <h2>{jobTitle}</h2>

                      <p>{companyName}</p>
                    </div>
                  </div>

                  <div className="job-meta">
                    <span>{location}</span>

                    <span>{jobType}</span>

                    <span>
                      Applied{" "}
                      {new Date(
                        application.createdAt,
                      ).toLocaleDateString("en-NG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="job-card-bottom">
                    <strong>
                      Status: {application.status}
                    </strong>

                    <Link
                      to={`/applications/${application._id}`}
                      className="view-job-btn"
                    >
                      View application
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export default MyApplications;