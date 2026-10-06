import { useEffect, useState } from "react";
import api from "../../services/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/admin/users");
      setUsers(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/users/${userId}`);

      setUsers((currentUsers) =>
        currentUsers.filter((user) => user._id !== userId)
      );
    } catch (err) {
      alert(
        err.response?.data?.message || "Failed to delete user"
      );
    }
  };

  const handleToggleStatus = async (user) => {
  console.log("DEACTIVATE CLICKED", user);

  try {
    const response = await api.patch(`/admin/users/${user._id}`, {
       isActive: !user.isActive,
    });

    console.log("UPDATE RESPONSE", response.data);

    const updatedUser = response.data.data;

    setUsers((currentUsers) =>
      currentUsers.map((currentUser) =>
        currentUser._id === user._id ? updatedUser : currentUser
      )
    );
  } catch (err) {
    console.error("UPDATE ERROR", err);
    alert(
      err.response?.data?.message || "Failed to update user"
    );
  }
};
  if (loading) {
    return (
      <div className="page-container">
        <h1>Manage Users</h1>
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <h1>Manage Users</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-container">
      <h1>Manage Users</h1>
      <p>View and manage registered users.</p>

      {users.length === 0 ? (
        <p>No users found.</p>
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
                <th style={cellStyle}>Name</th>
                <th style={cellStyle}>Email</th>
                <th style={cellStyle}>Role</th>
                <th style={cellStyle}>Status</th>
                <th style={cellStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td style={cellStyle}>
                    {user.firstName || ""}{" "}
                    {user.lastName || ""}
                    {!user.firstName &&
                      !user.lastName &&
                      user.companyName}
                  </td>

                  <td style={cellStyle}>{user.email}</td>

                  <td style={cellStyle}>
                    {user.role}
                  </td>

                  <td style={cellStyle}>
                    {user.isActive === false
                      ? "Inactive"
                      : "Active"}
                  </td>

                  <td style={cellStyle}>
                    {user.role !== "admin" && (
                      <>
                        <button
                          onClick={() =>
                            handleToggleStatus(user)
                          }
                          style={{ marginRight: "8px" }}
                        >
                          {user.isActive === false
                            ? "Activate"
                            : "Deactivate"}
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(user._id)
                          }
                        >
                          Delete
                        </button>
                      </>
                    )}

                    {user.role === "admin" && (
                      <span>Admin account</span>
                    )}
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

export default Users;