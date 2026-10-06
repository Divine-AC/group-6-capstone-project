const ApplicationStatus = ({ status }) => {
  const normalizedStatus = status?.toLowerCase() || "pending";

  const statusLabels = {
    pending: "Pending",
    reviewing: "Reviewing",
    shortlisted: "Shortlisted",
    rejected: "Rejected",
    accepted: "Accepted",
  };

  return (
    <span className={`application-status status-${normalizedStatus}`}>
      {statusLabels[normalizedStatus] || status}
    </span>
  );
};

export default ApplicationStatus;