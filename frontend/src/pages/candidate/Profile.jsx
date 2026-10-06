import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

const Profile = () => {
  const { setUser } = useContext(AuthContext);
  const location = useLocation();
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    experienceLevel: "",
    desiredRole: "",
    profilePicture: "",
    resume: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
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
          email: profile.email || "",
          phone: profile.phone || "",
          location: profile.location || "",
          experienceLevel: profile.experienceLevel || "",
          desiredRole: profile.desiredRole || "",
          profilePicture: profile.profilePicture || "",
          resume: profile.resume || "",
        });

        setUser((previous) => ({
          ...previous,
          ...profile,
        }));
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load your profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadingResume(true);
    setMessage("");
    setError("");

    try {
      const uploadData = new FormData();
      uploadData.append("resume", file);

      const response = await api.post("/users/profile/resume", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedProfile = response.data.data;

      setFormData((previous) => ({
        ...previous,
        resume: updatedProfile.resume || "",
      }));

      setUser((previous) => ({
        ...previous,
        resume: updatedProfile.resume || "",
      }));

      setMessage("Resume uploaded successfully.");

if (location.state?.returnTo) {
  setTimeout(() => {
    navigate(location.state.returnTo, { replace: true });
  }, 500);
}
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to upload your resume.",
      );
    } finally {
      setUploadingResume(false);
      event.target.value = "";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await api.patch("/users/profile", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        location: formData.location,
        experienceLevel: formData.experienceLevel,
        desiredRole: formData.desiredRole,
        profilePicture: formData.profilePicture,
      });

      const updatedProfile = response.data.data;

      setFormData((previous) => ({
        ...previous,
        firstName: updatedProfile.firstName || "",
        lastName: updatedProfile.lastName || "",
        phone: updatedProfile.phone || "",
        location: updatedProfile.location || "",
        experienceLevel: updatedProfile.experienceLevel || "",
        desiredRole: updatedProfile.desiredRole || "",
        profilePicture: updatedProfile.profilePicture || "",
        resume: updatedProfile.resume || previous.resume,
      }));

      setUser((previous) => ({
        ...previous,
        ...updatedProfile,
      }));

      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update your profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  const resumeName = formData.resume
    ? formData.resume.split("/").pop()
    : "";

  const resumeUrl = formData.resume
    ? `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "")}${formData.resume}`
    : "";

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <p className="profile-eyebrow">MY PROFILE</p>
          <h1>Profile Settings</h1>
          <p>
            Keep your personal and professional information up to date.
          </p>
        </div>

        {message && <div className="profile-success">{message}</div>}

        {error && <div className="profile-error">{error}</div>}

        <form className="profile-form" onSubmit={handleSubmit}>
          <section className="profile-section">
            <div className="profile-section-heading">
              <h2>Personal Information</h2>
              <p>Your basic account information.</p>
            </div>

            <div className="profile-grid">
              <div className="profile-field">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                />
              </div>

              <div className="profile-field">
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="profile-field profile-field-full">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Enugu, Nigeria"
                />
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <h2>Professional Information</h2>
              <p>Help employers understand what you're looking for.</p>
            </div>

            <div className="profile-grid">
              <div className="profile-field">
                <label htmlFor="experienceLevel">Experience Level</label>

                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                >
                  <option value="">Select experience level</option>
                  <option value="Entry level">Entry level</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-4 years">3-4 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>

              <div className="profile-field">
                <label htmlFor="desiredRole">Desired Role</label>

                <input
                  id="desiredRole"
                  name="desiredRole"
                  type="text"
                  value={formData.desiredRole}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                />
              </div>

              <div className="profile-field profile-field-full">
                <label htmlFor="resume">Resume</label>

                <div className="resume-upload">
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleResumeUpload}
                    disabled={uploadingResume}
                  />

                  <div className="resume-upload-info">
                    <strong>
                      {uploadingResume
                        ? "Uploading resume..."
                        : resumeName || "Upload your resume"}
                    </strong>

                    <span>
                      PDF, DOC or DOCX • Maximum 5 MB
                    </span>
                  </div>
                </div>

                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-view-link"
                  >
                    View current resume
                  </a>
                )}
              </div>
            </div>
          </section>

          <div className="profile-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
