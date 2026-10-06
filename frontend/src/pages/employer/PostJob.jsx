import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const PostJob = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    jobType: "",
    workMode: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    skills: "",
    deadline: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const skills = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill !== "");

      await api.post("/jobs", {
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        jobType: formData.jobType,
        workMode: formData.workMode,
        experienceLevel: formData.experienceLevel,
        salaryMin: formData.salaryMin
          ? Number(formData.salaryMin)
          : undefined,
        salaryMax: formData.salaryMax
          ? Number(formData.salaryMax)
          : undefined,
        skills,
        deadline: formData.deadline,
      });

      navigate("/employer/jobs");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create the job. Please check your information.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="employer-form-page">
      <div className="employer-form-container">
        <div className="employer-form-header">
          <p className="employer-form-eyebrow">EMPLOYER</p>
          <h1>Post a Job</h1>
          <p>
            Create a new opportunity and start receiving applications
            from qualified candidates.
          </p>
        </div>

        {error && (
          <div className="employer-form-error">
            {error}
          </div>
        )}

        <form
          className="employer-job-form"
          onSubmit={handleSubmit}
        >
          <section className="employer-form-section">
            <h2>Job Information</h2>

            <div className="employer-form-grid">
              <div className="employer-form-field">
                <label htmlFor="title">Job Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Junior Civil Engineer"
                  required
                />
              </div>

              <div className="employer-form-field">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Engineering"
                  required
                />
              </div>

              <div className="employer-form-field employer-form-field-full">
                <label htmlFor="description">Job Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the role, responsibilities and requirements..."
                  rows="7"
                  required
                />
              </div>

              <div className="employer-form-field">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Abuja"
                  required
                />
              </div>

              <div className="employer-form-field">
                <label htmlFor="jobType">Job Type</label>
                <select
                  id="jobType"
                  name="jobType"
                  value={formData.jobType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select job type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              <div className="employer-form-field">
                <label htmlFor="workMode">Work Mode</label>
                <select
                  id="workMode"
                  name="workMode"
                  value={formData.workMode}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select work mode</option>
                  <option value="On-site">On-site</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div className="employer-form-field">
                <label htmlFor="experienceLevel">
                  Experience Level
                </label>
                <select
                  id="experienceLevel"
                  name="experienceLevel"
                  value={formData.experienceLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select experience level</option>
                  <option value="Entry level">Entry level</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="3-4 years">3-4 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
            </div>
          </section>

          <section className="employer-form-section">
            <h2>Salary & Requirements</h2>

            <div className="employer-form-grid">
              <div className="employer-form-field">
                <label htmlFor="salaryMin">Minimum Salary</label>
                <input
                  id="salaryMin"
                  name="salaryMin"
                  type="number"
                  min="0"
                  value={formData.salaryMin}
                  onChange={handleChange}
                  placeholder="e.g. 100000"
                />
              </div>

              <div className="employer-form-field">
                <label htmlFor="salaryMax">Maximum Salary</label>
                <input
                  id="salaryMax"
                  name="salaryMax"
                  type="number"
                  min="0"
                  value={formData.salaryMax}
                  onChange={handleChange}
                  placeholder="e.g. 200000"
                />
              </div>

              <div className="employer-form-field employer-form-field-full">
                <label htmlFor="skills">
                  Skills
                </label>
                <input
                  id="skills"
                  name="skills"
                  type="text"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. AutoCAD, Revit, Project Management"
                />
                <small>
                  Separate multiple skills with commas.
                </small>
              </div>

              <div className="employer-form-field">
                <label htmlFor="deadline">Application Deadline</label>
                <input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </section>

          <div className="employer-form-actions">
            <button
              type="button"
              onClick={() => navigate("/employer/jobs")}
              className="employer-form-cancel"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="employer-form-submit"
            >
              {saving ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;