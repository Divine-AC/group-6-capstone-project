const JobForm = ({
  formData,
  onChange,
  onSubmit,
  submitting = false,
  submitLabel = "Save Job",
}) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange(name, value);
  };

  return (
    <form className="job-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="title">Job Title</label>
        <input
          id="title"
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          name="category"
          value={formData.category || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <input
          id="location"
          name="location"
          value={formData.location || ""}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="jobType">Job Type</label>
        <select
          id="jobType"
          name="jobType"
          value={formData.jobType || ""}
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

      <div className="form-group">
        <label htmlFor="experienceLevel">Experience Level</label>
        <select
          id="experienceLevel"
          name="experienceLevel"
          value={formData.experienceLevel || ""}
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

      <div className="form-group">
        <label htmlFor="workMode">Work Mode</label>
        <select
          id="workMode"
          name="workMode"
          value={formData.workMode || ""}
          onChange={handleChange}
        >
          <option value="">Select work mode</option>
          <option value="On-site">On-site</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="salaryMin">Minimum Salary</label>
          <input
            id="salaryMin"
            name="salaryMin"
            type="number"
            value={formData.salaryMin || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="salaryMax">Maximum Salary</label>
          <input
            id="salaryMax"
            name="salaryMax"
            type="number"
            value={formData.salaryMax || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="deadline">Application Deadline</label>
        <input
          id="deadline"
          name="deadline"
          type="date"
          value={formData.deadline || ""}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Job Description</label>
        <textarea
          id="description"
          name="description"
          rows="6"
          value={formData.description || ""}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default JobForm;