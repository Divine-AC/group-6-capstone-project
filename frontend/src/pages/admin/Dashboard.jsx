import { useEffect, useState } from "react";
import api from "../../services/api";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/admin/dashboard");
        setData(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <div className="page-container"><h1>Admin Dashboard</h1><p>Loading...</p></div>;

  if (error) return <div className="page-container"><h1>Admin Dashboard</h1><p>{error}</p></div>;

  return (
    <div className="page-container">
      <h1>Admin Dashboard</h1>
      <p>Manage users, jobs and applications.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <strong>{data?.users ?? 0}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Total Jobs</h3>
          <strong>{data?.jobs ?? 0}</strong>
        </div>

        <div className="dashboard-card">
          <h3>Total Applications</h3>
          <strong>{data?.applications ?? 0}</strong>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
