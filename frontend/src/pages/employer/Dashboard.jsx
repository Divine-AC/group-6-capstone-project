import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const jobsResponse = await api.get("/jobs");

        const allJobs = jobsResponse.data.data || [];

        const employerJobs = allJobs.filter((job) => {
          if (!job.employer || !user) {
            return false;
          }

          const employerId =
            typeof job.employer === "object"
              ? job.employer._id
              : job.employer;

          return employerId === user.id;
        });

        setJobs(employerJobs);

        const applicationResults = await Promise.all(
          employerJobs.map(async (job) => {
            try {
              const response = await api.get(
                `/applications/job/${job._id}`,
              );

              return response.data.data || [];
            } catch {
              return [];
            }
          }),
        );

        const employerApplications = applicationResults.flat();

        setApplications(employerApplications);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load your dashboard.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const totalJobs = jobs.length;

  const activeJobs = jobs.filter((job) => {
    if (!job.deadline) {
      return true;
    }

    return new Date(job.deadline) >= new Date();
  }).length;

  const totalApplications = applications.length;

  const pendingApplications = applications.filter(
    (application) => application.status === "pending",
  ).length;

  const recentApplications = [...applications]
    .sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    .slice(0, 5);

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
      <div className="employer-dashboard-page">
        <div className="employer-dashboard-container">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-dashboard-page">
      <div className="employer-dashboard-container">
        <section className="employer-dashboard-welcome">
          <div>
            <p className="employer-dashboard-eyebrow">
              EMPLOYER DASHBOARD
            </p>

            <h1>
              Welcome back
              {user && user.companyName
                ? `, ${user.companyName}`
                : user && user.firstName
                  ? `, ${user.firstName}`
                  : ""}
              .
            </h1>

            <p>
              Manage your job listings and keep track of applicants.
            </p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="employer-dashboard-primary-btn"
          >
            Post a Job
          </Link>
        </section>

        {error && (
          <div className="employer-dashboard-error">
            {error}
          </div>
        )}

        <section className="employer-dashboard-stats">
          <div className="employer-dashboard-stat-card">
            <span>Total Jobs</span>
            <strong>{totalJobs}</strong>
          </div>

          <div className="employer-dashboard-stat-card">
            <span>Active Jobs</span>
            <strong>{activeJobs}</strong>
          </div>

          <div className="employer-dashboard-stat-card">
            <span>Total Applications</span>
            <strong>{totalApplications}</strong>
          </div>

          <div className="employer-dashboard-stat-card">
            <span>Pending Applications</span>
            <strong>{pendingApplications}</strong>
          </div>
        </section>

        <section className="employer-dashboard-content">
          <div className="employer-dashboard-section">
            <div className="employer-dashboard-section-heading">
              <div>
                <p className="employer-dashboard-eyebrow">
                  APPLICATIONS
                </p>
                <h2>Recent Applications</h2>
              </div>

              <Link to="/employer/jobs">
                View all
              </Link>
            </div>

            {recentApplications.length === 0 ? (
              <div className="employer-dashboard-empty">
                <h3>No applications yet</h3>
                <p>
                  Applications from candidates will appear here when
                  they apply to your jobs.
                </p>
              </div>
            ) : (
              <div className="employer-dashboard-applications">
                {recentApplications.map((application) => {
                  const candidate = application.candidate || {};
                  const job = application.job || {};

                  return (
                    <div
                      className="employer-dashboard-application"
                      key={application._id}
                    >
                      <div>
                        <h3>
                          {candidate.firstName || ""}{" "}
                          {candidate.lastName || ""}
                        </h3>

                        <p>
                          {job.title || "Job not available"}
                        </p>

                        <span>
                          Applied {formatDate(application.createdAt)}
                        </span>
                      </div>

                      <div className="employer-dashboard-application-right">
                        <span
                          className={`employer-dashboard-status employer-dashboard-status-${application.status}`}
                        >
                          {application.status || "pending"}
                        </span>

                        {job._id && (
                          <Link
                            to={`/employer/jobs/${job._id}/applications`}
                          >
                            View
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <aside className="employer-dashboard-actions">
            <p className="employer-dashboard-eyebrow">
              QUICK ACTIONS
            </p>

            <h2>Manage your recruitment</h2>

            <Link
              to="/employer/jobs/new"
              className="employer-dashboard-action"
            >
              <strong>Post a Job</strong>
              <span>Create a new job opportunity</span>
            </Link>

            <Link
              to="/employer/jobs"
              className="employer-dashboard-action"
            >
              <strong>My Jobs</strong>
              <span>Manage your job listings</span>
            </Link>

            <Link
              to="/employer/jobs"
              className="employer-dashboard-action"
            >
              <strong>Applications</strong>
              <span>Review candidates</span>
            </Link>

            <Link
              to="/employer/profile"
              className="employer-dashboard-action"
            >
              <strong>Company Profile</strong>
              <span>Update your company information</span>
            </Link>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
