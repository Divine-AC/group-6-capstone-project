import { useEffect, useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const EmployerProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/users/profile");
        const profile = response.data.data;

        setFormData({
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          companyName: profile.companyName || "",
          email: profile.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Failed to load your profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await api.patch("/users/profile", {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        companyName: formData.companyName.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
      });

      const profile = response.data.data;

      setFormData((previous) => ({
        ...previous,
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        companyName: profile.companyName || "",
        phone: profile.phone || "",
        location: profile.location || "",
      }));

      setMessage("Company profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to update your profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="employer-profile-page">
        <div className="employer-profile-container">
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="employer-profile-page">
      <div className="employer-profile-container">
        <div className="employer-profile-header">
          <div>
            <p className="employer-profile-eyebrow">
              EMPLOYER
            </p>

            <h1>Company Profile</h1>

            <p>
              Manage your company and contact information.
            </p>
          </div>
        </div>

        {error && (
          <div className="employer-profile-message employer-profile-error">
            {error}
          </div>
        )}

        {message && (
          <div className="employer-profile-message employer-profile-success">
            {message}
          </div>
        )}

        <form
          className="employer-profile-card"
          onSubmit={handleSubmit}
        >
          <div className="employer-profile-section">
            <div className="employer-profile-section-heading">
              <h2>Company Information</h2>
              <p>
                This information is shown to candidates viewing
                your job listings.
              </p>
            </div>

            <div className="employer-profile-grid">
              <div className="employer-profile-field">
                <label htmlFor="companyName">
                  Company Name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="employer-profile-field">
                <label htmlFor="location">
                  Company Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Abuja, Nigeria"
                />
              </div>
            </div>
          </div>

          <div className="employer-profile-section">
            <div className="employer-profile-section-heading">
              <h2>Contact Person</h2>
              <p>
                Keep your personal contact details up to date.
              </p>
            </div>

            <div className="employer-profile-grid">
              <div className="employer-profile-field">
                <label htmlFor="firstName">
                  First Name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="employer-profile-field">
                <label htmlFor="lastName">
                  Last Name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="employer-profile-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  readOnly
                />
              </div>

              <div className="employer-profile-field">
                <label htmlFor="phone">
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="e.g. 08012345678"
                />
              </div>
            </div>
          </div>

          <div className="employer-profile-actions">
            <button
              type="submit"
              disabled={saving}
              className="employer-profile-save-btn"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerProfile;
