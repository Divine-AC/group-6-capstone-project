import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

const JobApplications = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setLoading(true);
        setError("");

        const jobResponse = await api.get(`/jobs/${id}`);
        const applicationsResponse = await api.get(
          `/applications/job/${id}`,
        );

        setJob(jobResponse.data.data);
        setApplications(
          applicationsResponse.data.data || [],
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load job applications.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      setUpdatingId(applicationId);

      const response = await api.patch(
        `/applications/${applicationId}/status`,
        {
          status,
        },
      );

      const updatedApplication = response.data.data;

      setApplications((previous) =>
        previous.map((application) =>
          application._id === applicationId
            ? updatedApplication
            : application,
        ),
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update application status.",
      );
    } finally {
      setUpdatingId("");
    }
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

  const getStatusClass = (status) => {
    return `employer-application-status employer-application-status-${status}`;
  };

  if (loading) {
    return (
      <div className="employer-applications-page">
        <div className="employer-applications-container">
          <p>Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-applications-page">
      <div className="employer-applications-container">
        <div className="employer-applications-header">
          <div>
            <p className="employer-applications-eyebrow">
              APPLICATIONS
            </p>

            <h1>
              {job ? job.title : "Job Applications"}
            </h1>

            {job && (
              <p>
                {job.employer?.companyName || "Company"}
                {job.location ? ` • ${job.location}` : ""}
              </p>
            )}
          </div>

          <Link
            to="/employer/jobs"
            className="employer-applications-back"
          >
            Back to My Jobs
          </Link>
        </div>

        {error && (
          <div className="employer-applications-error">
            {error}
          </div>
        )}

        <div className="employer-applications-summary">
          <strong>{applications.length}</strong>
          <span>
            {applications.length === 1
              ? "Application"
              : "Applications"}
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="employer-applications-empty">
            <h2>No applications yet</h2>

            <p>
              Candidates who apply for this job will appear here.
            </p>
          </div>
        ) : (
          <div className="employer-applications-list">
            {applications.map((application) => {
              const candidate = application.candidate || {};

              const resumeUrl = application.resume
                ? `http://localhost:7000${application.resume}`
                : "";

              const resumeName = application.resume
                ? application.resume.split("/").pop()
                : "";

              return (
                <article
                  className="employer-application-card"
                  key={application._id}
                >
                  <div className="employer-application-header">
                    <div>
                      <h2>
                        {candidate.firstName || ""}{" "}
                        {candidate.lastName || ""}
                      </h2>

                      <p>
                        {candidate.email ||
                          "Email not available"}
                      </p>

                      {candidate.phone && (
                        <p>{candidate.phone}</p>
                      )}
                    </div>

                    <span
                      className={getStatusClass(
                        application.status,
                      )}
                    >
                      {application.status || "pending"}
                    </span>
                  </div>

                  <div className="employer-application-meta">
                    <span>
                      Applied {formatDate(application.createdAt)}
                    </span>

                    {candidate.location && (
                      <span>{candidate.location}</span>
                    )}

                    {candidate.experienceLevel && (
                      <span>
                        {candidate.experienceLevel}
                      </span>
                    )}
                  </div>

                  <div className="employer-application-cover">
                    <h3>Cover Letter</h3>

                    <p>
                      {application.coverLetter ||
                        "No cover letter provided."}
                    </p>
                  </div>

                  {application.resume && (
                    <div className="employer-application-resume">
                      <div>
                        <strong>{resumeName}</strong>
                        <span>Candidate resume</span>
                      </div>

                      <a
                        href={resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    </div>
                  )}

                  <div className="employer-application-actions">
                    <label htmlFor={`status-${application._id}`}>
                      Update Status
                    </label>

                    <select
                      id={`status-${application._id}`}
                      value={application.status || "pending"}
                      disabled={
                        updatingId === application._id
                      }
                      onChange={(event) =>
                        updateStatus(
                          application._id,
                          event.target.value,
                        )
                      }
                    >
                      <option value="pending">
                        Pending
                      </option>
                      <option value="reviewing">
                        Reviewing
                      </option>
                      <option value="shortlisted">
                        Shortlisted
                      </option>
                      <option value="rejected">
                        Rejected
                      </option>
                      <option value="accepted">
                        Accepted
                      </option>
                    </select>

                    {updatingId === application._id && (
                      <span>Updating...</span>
                    )}
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

export default JobApplications;