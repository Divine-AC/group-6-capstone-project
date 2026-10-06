import ApplicationStatus from "./ApplicationStatus";

const ApplicationCard = ({ application, onView }) => {
  const job = application?.job;
  const employer = job?.employer;

  return (
    <article className="application-card">
      <div className="application-card-content">
        <div>
          <h3>{job?.title || "Untitled job"}</h3>

          <p className="application-company">
            {employer?.companyName ||
              employer?.firstName ||
              "Unknown employer"}
          </p>

          <div className="application-meta">
            <span>{job?.location || "Location not specified"}</span>
            <span>{job?.jobType || "Job type not specified"}</span>
          </div>
        </div>

        <ApplicationStatus status={application?.status} />
      </div>

      <div className="application-card-footer">
        <span>
          Applied{" "}
          {application?.createdAt
            ? new Date(application.createdAt).toLocaleDateString()
            : "—"}
        </span>

        {onView && (
          <button type="button" onClick={() => onView(application)}>
            View Application
          </button>
        )}
      </div>
    </article>
  );
};

export default ApplicationCard;