import { useEffect, useState } from "react";
import api from "../../services/api";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/jobs");
      setJobs(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load jobs"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/jobs/${jobId}`);

      setJobs((currentJobs) =>
        currentJobs.filter((job) => job._id !== jobId)
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <h1>Manage Jobs</h1>
        <p>Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Manage Jobs</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Manage Jobs</h1>
      <p>View and moderate jobs posted by employers.</p>

      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
            }}
          >
            <thead>
              <tr>
                <th style={cellStyle}>Job Title</th>
                <th style={cellStyle}>Employer</th>
                <th style={cellStyle}>Location</th>
                <th style={cellStyle}>Job Type</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {jobs.map((job) => (
                <tr key={job._id}>
                  <td style={cellStyle}>
                    {job.title}
                  </td>

                  <td style={cellStyle}>
                    {job.employer?.companyName ||
                      job.employer?.firstName ||
                      "Unknown employer"}
                  </td>

                  <td style={cellStyle}>
                    {job.location || "Not specified"}
                  </td>

                  <td style={cellStyle}>
                    {job.jobType || "Not specified"}
                  </td>

                  <td style={cellStyle}>
                    <button
                      onClick={() =>
                        handleDelete(job._id)
                      }
                    >
                      Delete
                    </button>
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

export default Jobs;