import ApplicationStatus from "../applications/ApplicationStatus";

const ApplicationList = ({
  applications = [],
  onStatusChange,
}) => {
  if (applications.length === 0) {
    return (
      <div className="empty-state">
        <p>No applications found.</p>
      </div>
    );
  }

  return (
    <div className="application-list">
      {applications.map((application) => {
        const candidate = application?.candidate;

        return (
          <article
            className="employer-application-card"
            key={application._id}
          >
            <div className="employer-application-main">
              <div>
                <h3>
                  {candidate?.firstName || ""}{" "}
                  {candidate?.lastName || ""}
                </h3>

                <p>{candidate?.email || "No email provided"}</p>

                {candidate?.phone && (
                  <p>{candidate.phone}</p>
                )}

                <ApplicationStatus status={application.status} />
              </div>

              <div className="employer-application-details">
                <p>
                  Applied{" "}
                  {application.createdAt
                    ? new Date(
                        application.createdAt,
                      ).toLocaleDateString()
                    : "—"}
                </p>

                {application.coverLetter && (
                  <p>{application.coverLetter}</p>
                )}
              </div>
            </div>

            {onStatusChange && (
              <div className="application-actions">
                <select
                  value={application.status || "pending"}
                  onChange={(event) =>
                    onStatusChange(
                      application,
                      event.target.value,
                    )
                  }
                >
                  <option value="pending">Pending</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">
                    Shortlisted
                  </option>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
};

export default ApplicationList;