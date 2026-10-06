import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../services/api";

const MyJobs = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/jobs");
      const allJobs = response.data.data || [];

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
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load your jobs.",
      );
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const loadJobs = async () => {
      await fetchJobs();
    };

    loadJobs();
  }, [user, fetchJobs]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(jobId);

      await api.delete(`/jobs/${jobId}`);

      setJobs((previous) =>
        previous.filter((job) => job._id !== jobId),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to delete the job.",
      );
    } finally {
      setDeletingId("");
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "No deadline";
    }

    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isExpired = (deadline) => {
    if (!deadline) {
      return false;
    }

    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="employer-jobs-page">
        <div className="employer-jobs-container">
          <p>Loading your jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-jobs-page">
      <div className="employer-jobs-container">
        <div className="employer-jobs-header">
          <div>
            <p className="employer-jobs-eyebrow">
              EMPLOYER
            </p>

            <h1>My Jobs</h1>

            <p>
              Manage the jobs you have posted and review candidates.
            </p>
          </div>

          <Link
            to="/employer/jobs/new"
            className="employer-jobs-primary-btn"
          >
            Post a Job
          </Link>
        </div>

        {error && (
          <div className="employer-jobs-error">
            {error}
          </div>
        )}

        {jobs.length === 0 ? (
          <div className="employer-jobs-empty">
            <h2>You haven't posted any jobs yet.</h2>

            <p>
              Create your first job listing to start receiving
              applications.
            </p>

            <Link
              to="/employer/jobs/new"
              className="employer-jobs-primary-btn"
            >
              Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="employer-jobs-list">
            {jobs.map((job) => {
              const expired = isExpired(job.deadline);

              return (
                <article
                  className="employer-job-card"
                  key={job._id}
                >
                  <div className="employer-job-card-main">
                    <div className="employer-job-card-heading">
                      <div>
                        <p className="employer-job-category">
                          {job.category}
                        </p>

                        <h2>{job.title}</h2>
                      </div>

                      <span
                        className={
                          expired
                            ? "employer-job-status expired"
                            : "employer-job-status active"
                        }
                      >
                        {expired ? "Expired" : "Active"}
                      </span>
                    </div>

                    <p className="employer-job-description">
                      {job.description}
                    </p>

                    <div className="employer-job-meta">
                      <span>{job.location}</span>
                      <span>{job.jobType}</span>
                      <span>{job.workMode}</span>
                      <span>
                        Deadline: {formatDate(job.deadline)}
                      </span>
                    </div>
                  </div>

                  <div className="employer-job-card-actions">
                    <Link
                      to={`/employer/jobs/${job._id}/applications`}
                    >
                      Applications
                    </Link>

                    <Link
                      to={`/employer/jobs/${job._id}/edit`}
                    >
                      Edit
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(job._id)}
                      disabled={deletingId === job._id}
                    >
                      {deletingId === job._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
