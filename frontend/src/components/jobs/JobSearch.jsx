
function JobSearch({ search, setSearch }) {
  return (
    <div className="job-search">
      <span className="job-search-icon">⌕</span>

      <input
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search job title, company or keyword..."
        aria-label="Search jobs"
      />

      {search && (
        <button
          type="button"
          className="clear-search"
          onClick={() => setSearch("")}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}

export default JobSearch;
