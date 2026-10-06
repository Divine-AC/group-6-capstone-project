import { useEffect, useState } from "react";
import api from "../../services/api";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchApplications = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/applications");
      setApplications(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const filteredApplications =
    statusFilter === "all"
      ? applications
      : applications.filter(
          (application) => application.status === statusFilter
        );

  if (loading) {
    return (
      <div className="page-container">
        <h1>Manage Applications</h1>
        <p>Loading applications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Manage Applications</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Manage Applications</h1>
      <p>View and monitor job applications submitted by candidates.</p>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="statusFilter">
          <strong>Filter by status: </strong>
        </label>

        <select
          id="statusFilter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: "8px", marginLeft: "8px" }}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="reviewing">Reviewing</option>
          <option value="shortlisted">Shortlisted</option>
          <option value="rejected">Rejected</option>
          <option value="accepted">Accepted</option>
        </select>
      </div>

      {filteredApplications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>Candidate</th>
                <th style={cellStyle}>Job</th>
                <th style={cellStyle}>Employer</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Date Applied</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application._id}>
                  <td style={cellStyle}>
                    {application.candidate?.firstName}{" "}
                    {application.candidate?.lastName}
                  </td>

                  <td style={cellStyle}>
                    {application.job?.title || "Unknown job"}
                  </td>

                  <td style={cellStyle}>
                    {application.job?.employer?.companyName ||
                      application.job?.employer?.firstName ||
                      "Unknown employer"}
                  </td>

                  <td style={cellStyle}>
                    {application.status}
                  </td>

                  <td style={cellStyle}>
                    {application.createdAt
                      ? new Date(
                          application.createdAt
                        ).toLocaleDateString()
                      : "Unknown"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

export default Applications;