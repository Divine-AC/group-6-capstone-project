function JobFilter({ filters, setFilters, onClear }) {
  const categories = [
    "Engineering",
    "Technology",
    "Finance",
    "Healthcare",
    "Marketing",
    "Education",
    "Sales",
    "Other",
  ];

  const states = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
    "Abuja",
  ];

  const experienceOptions = [
    { value: "all", label: "All experience levels" },
    { value: "Entry level", label: "Entry level" },
    { value: "1-2 years", label: "1-2 years" },
    { value: "3-4 years", label: "3-4 years" },
    { value: "5+ years", label: "5+ years" },
  ];

  const dateOptions = [
    { value: "all", label: "Any time" },
    { value: "1", label: "Past 24 hours" },
    { value: "7", label: "Past 7 days" },
    { value: "30", label: "Past 30 days" },
  ];

  const updateFilter = (name, value) => {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  return (
    <section className="job-filter">
      <div className="filter-heading">
        <div>
          <h3>Filter jobs</h3>
          <p>Choose your preferences</p>
        </div>

        <button type="button" onClick={onClear} className="clear-filters">
          Clear all
        </button>
      </div>

      <label htmlFor="category">Job category</label>
      <select
        id="category"
        value={filters.category}
        onChange={(e) => updateFilter("category", e.target.value)}
      >
        <option value="all">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <label htmlFor="location">Location</label>
      <select
        id="location"
        value={filters.location}
        onChange={(e) => updateFilter("location", e.target.value)}
      >
        <option value="all">All Nigerian states</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state === "Abuja" ? "Abuja (FCT)" : `${state} State`}
          </option>
        ))}
      </select>

      <label htmlFor="experience">Experience</label>
      <select
        id="experience"
        value={filters.experience}
        onChange={(e) => updateFilter("experience", e.target.value)}
      >
        {experienceOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="datePosted">Date posted</label>
      <select
        id="datePosted"
        value={filters.datePosted}
        onChange={(e) => updateFilter("datePosted", e.target.value)}
      >
        {dateOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <label htmlFor="jobType">Employment type</label>
      <select
        id="jobType"
        value={filters.jobType}
        onChange={(e) => updateFilter("jobType", e.target.value)}
      >
        <option value="all">All employment types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>

      <label htmlFor="workMode">Work mode</label>
      <select
        id="workMode"
        value={filters.workMode}
        onChange={(e) => updateFilter("workMode", e.target.value)}
      >
        <option value="all">All work modes</option>
        <option value="On-site">On-site</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </section>
  );
}

export default JobFilter;
