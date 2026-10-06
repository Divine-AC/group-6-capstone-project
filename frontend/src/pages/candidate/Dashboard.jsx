import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get("/applications/my-applications");
        setApplications(response.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load your application information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const reviewingApplications = applications.filter(
    (application) => application.status === "reviewing",
  ).length;

  const shortlistedApplications = applications.filter(
    (application) => application.status === "shortlisted",
  ).length;

  const acceptedApplications = applications.filter(
    (application) => application.status === "accepted",
  ).length;

  const recentApplications = [...applications]
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 5);

  const getStatusClass = (status) => {
    return `dashboard-status dashboard-status-${status}`;
  };

  const formatDate = (date) => {
    if (!date) {
      return "N/A";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-eyebrow">CANDIDATE DASHBOARD</p>

            <h1>
              Welcome back
              {user && user.firstName ? `, ${user.firstName}` : ""}.
            </h1>

            <p>
              Keep track of your job applications and discover your next
              opportunity.
            </p>
          </div>

          <Link to="/jobs" className="dashboard-primary-btn">
            Browse Jobs
          </Link>
        </section>

        {error && <p className="dashboard-error">{error}</p>}

        <section className="dashboard-stats">
          <div className="dashboard-stat-card">
            <span>Total Applications</span>
            <strong>{totalApplications}</strong>
          </div>

          <div className="dashboard-stat-card">
            <span>Pending</span>
            <strong>{pendingApplications}</strong>
          </div>

          <div className="dashboard-stat-card">
            <span>Reviewing</span>
            <strong>{reviewingApplications}</strong>
          </div>

          <div className="dashboard-stat-card">
            <span>Shortlisted</span>
            <strong>{shortlistedApplications}</strong>
          </div>

          <div className="dashboard-stat-card">
            <span>Accepted</span>
            <strong>{acceptedApplications}</strong>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-section">
            <div className="dashboard-section-heading">
              <div>
                <p className="dashboard-eyebrow">RECENT ACTIVITY</p>
                <h2>Recent Applications</h2>
              </div>

              <Link to="/applications">View all</Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="dashboard-empty">
                <h3>No applications yet</h3>
                <p>
                  You haven't applied for any jobs yet. Find a job that
                  interests you and send your first application.
                </p>

                <Link to="/jobs" className="dashboard-secondary-btn">
                  Find Jobs
                </Link>
              </div>
            ) : (
              <div className="dashboard-applications">
                {recentApplications.map((application) => {
                  const job = application.job || {};
                  const employer = job.employer || {};

                  return (
                    <div
                      className="dashboard-application"
                      key={application._id}
                    >
                      <div className="dashboard-application-info">
                        <h3>{job.title || "Untitled Job"}</h3>

                        <p>
                          {employer.companyName ||
                            `${employer.firstName || ""} ${
                              employer.lastName || ""
                            }`.trim() ||
                            "Company not available"}
                        </p>

                        <span>
                          Applied {formatDate(application.createdAt)}
                        </span>
                      </div>

                      <div className="dashboard-application-right">
                        <span className={getStatusClass(application.status)}>
                          {application.status || "pending"}
                        </span>

                        <Link to={`/applications/${application._id}`}>
                          View
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="dashboard-quick-actions">
            <p className="dashboard-eyebrow">QUICK ACTIONS</p>
            <h2>What do you want to do?</h2>

            <Link to="/jobs" className="dashboard-action">
              <strong>Browse Jobs</strong>
              <span>Find available opportunities</span>
            </Link>

            <Link to="/applications" className="dashboard-action">
              <strong>My Applications</strong>
              <span>Track all your applications</span>
            </Link>

            <Link to="/profile" className="dashboard-action">
              <strong>My Profile</strong>
              <span>Update your personal information</span>
            </Link>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;