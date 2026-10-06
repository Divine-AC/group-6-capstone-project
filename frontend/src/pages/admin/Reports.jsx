import { useEffect, useState } from "react";
import api from "../../services/api";

const Reports = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/admin/reports");
        setData(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load reports"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <h1>Reports</h1>
        <p>Loading reports...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Reports</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Reports</h1>
      <p>Overview of users, jobs and applications.</p>

      <section style={{ marginTop: "30px" }}>
        <h2>Users by Role</h2>

        {data?.usersByRole?.length ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Role</th>
                <th style={cellStyle}>Count</th>
              </tr>
            </thead>

            <tbody>
              {data.usersByRole.map((item) => (
                <tr key={item._id}>
                  <td style={cellStyle}>{item._id}</td>
                  <td style={cellStyle}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No user data available.</p>
        )}
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Jobs by Category</h2>

        {data?.jobsByCategory?.length ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Category</th>
                <th style={cellStyle}>Count</th>
              </tr>
            </thead>

            <tbody>
              {data.jobsByCategory.map((item) => (
                <tr key={item._id}>
                  <td style={cellStyle}>{item._id}</td>
                  <td style={cellStyle}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No job data available.</p>
        )}
      </section>

      <section style={{ marginTop: "30px" }}>
        <h2>Applications by Status</h2>

        {data?.applicationsByStatus?.length ? (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Count</th>
              </tr>
            </thead>

            <tbody>
              {data.applicationsByStatus.map((item) => (
                <tr key={item._id}>
                  <td style={cellStyle}>{item._id}</td>
                  <td style={cellStyle}>{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No application data available.</p>
        )}
      </section>
    </div>
  );
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "15px",
};

const cellStyle = {
  border: "1px solid #ddd",
  padding: "10px",
  textAlign: "left",
};

export default Reports;