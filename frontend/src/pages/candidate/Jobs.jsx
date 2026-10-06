import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import JobCard from "../../components/jobs/JobCard";
import JobFilter from "../../components/jobs/JobFilter";
import JobSearch from "../../components/jobs/JobSearch";
import api from "../../services/api";

const initialFilters = {
  category: "all",
  location: "all",
  experience: "all",
  datePosted: "all",
  jobType: "all",
  workMode: "all",
};

function Jobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") || "",
  );

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "all",
    location: searchParams.get("location") || "all",
    experience: searchParams.get("experienceLevel") || "all",
    datePosted: searchParams.get("datePosted") || "all",
    jobType: searchParams.get("jobType") || "all",
    workMode: searchParams.get("workMode") || "all",
  });

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const [savedJobs, setSavedJobs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("jrp-saved-jobs")) || [];
    } catch {
      return [];
    }
  });

  const pageSize = 10;

  useEffect(() => {
    const controller = new AbortController();

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        if (search.trim()) {
          params.search = search.trim();
        }

        if (filters.category !== "all") {
          params.category = filters.category;
        }

        if (filters.location !== "all") {
          params.location = filters.location;
        }

        if (filters.experience !== "all") {
          params.experienceLevel = filters.experience;
        }

        if (filters.datePosted !== "all") {
          params.datePosted = filters.datePosted;
        }

        if (filters.jobType !== "all") {
          params.jobType = filters.jobType;
        }

        if (filters.workMode !== "all") {
          params.workMode = filters.workMode;
        }

        const response = await api.get("/jobs", {
          params,
          signal: controller.signal,
        });

        setJobs(response.data.data || []);
      } catch (err) {
        if (err.code === "ERR_CANCELED") {
          return;
        }

        setError(
          err.response?.data?.message ||
            "Unable to load jobs. Please try again.",
        );
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();

    return () => controller.abort();
  }, [search, filters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (search.trim()) {
      params.set("search", search.trim());
    }

    if (filters.category !== "all") {
      params.set("category", filters.category);
    }

    if (filters.location !== "all") {
      params.set("location", filters.location);
    }

    if (filters.experience !== "all") {
      params.set("experienceLevel", filters.experience);
    }

    if (filters.datePosted !== "all") {
      params.set("datePosted", filters.datePosted);
    }

    if (filters.jobType !== "all") {
      params.set("jobType", filters.jobType);
    }

    if (filters.workMode !== "all") {
      params.set("workMode", filters.workMode);
    }

    setSearchParams(params, { replace: true });
  }, [search, filters, setSearchParams]);

  const totalPages = Math.ceil(jobs.length / pageSize);

  const displayedJobs = jobs.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const updateSearch = (value) => {
    setSearch(value);
  };

  const updateFilters = (filterUpdater) => {
    setFilters((previous) => filterUpdater(previous));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearch("");
    setPage(1);
  };

  const toggleSave = (id) => {
    setSavedJobs((previous) => {
      const updated = previous.includes(id)
        ? previous.filter((savedId) => savedId !== id)
        : [...previous, id];

      localStorage.setItem(
        "jrp-saved-jobs",
        JSON.stringify(updated),
      );

      return updated;
    });
  };

  return (
    <main className="jobs-page">
      <section className="jobs-hero">
        <div className="jobs-hero-content">
          <span className="section-eyebrow">
            CAREER OPPORTUNITIES
          </span>

          <h1>Find work that moves you forward.</h1>

          <p>
            Explore job opportunities across Nigeria and discover
            roles that match your skills and goals.
          </p>

          <JobSearch
            search={search}
            setSearch={updateSearch}
          />
        </div>
      </section>

      <div className="jobs-container">
        <div className="jobs-page-heading">
          <div>
            <h2>Explore opportunities</h2>

            <p>
              {loading
                ? "Loading jobs..."
                : `${jobs.length} matching ${
                    jobs.length === 1 ? "opportunity" : "opportunities"
                  }`}
            </p>
          </div>
        </div>

        <div className="jobs-layout">
          <aside className="jobs-sidebar">
            <JobFilter
              filters={filters}
              setFilters={updateFilters}
              onClear={clearFilters}
            />
          </aside>

          <section className="jobs-results">
            {loading ? (
              <div className="jobs-empty">
                <h3>Loading jobs...</h3>
                <p>We're fetching the latest opportunities.</p>
              </div>
            ) : error ? (
              <div className="jobs-empty">
                <h3>Unable to load jobs</h3>
                <p>{error}</p>

                <button
                  type="button"
                  onClick={() => window.location.reload()}
                >
                  Try again
                </button>
              </div>
            ) : displayedJobs.length > 0 ? (
              <>
                {displayedJobs.map((job) => (
                  <JobCard
                    key={job._id}
                    job={job}
                    isSaved={savedJobs.includes(job._id)}
                    onToggleSave={toggleSave}
                  />
                ))}

                {totalPages > 1 && (
                  <div className="jobs-pagination">
                    <button
                      type="button"
                      disabled={page === 1}
                      onClick={() =>
                        setPage((previous) => previous - 1)
                      }
                    >
                      Previous
                    </button>

                    <span>
                      Page {page} of {totalPages}
                    </span>

                    <button
                      type="button"
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((previous) => previous + 1)
                      }
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="jobs-empty">
                <div className="empty-icon">⌕</div>

                <h3>No matching jobs found</h3>

                <p>
                  Try changing your search or clearing some filters.
                </p>

                <button type="button" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Jobs;
