import { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(`/jobs/${id}`);
        setJob(response.data.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load this job.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!coverLetter.trim()) {
      setError("Please write a cover letter before applying.");
      return;
    }

    if (!user?.resume) {
      setError(
        "Please upload a resume to your profile before applying.",
      );
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.post("/applications", {
        job: id,
        coverLetter: coverLetter.trim(),
      });

      setSuccess("Application submitted successfully.");

      setTimeout(() => {
        navigate("/applications");
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to submit your application.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Loading application...</h3>
          <p>We're preparing the application form.</p>
        </div>
      </main>
    );
  }

  if (error && !job) {
    return (
      <main className="job-details-page">
        <div className="jobs-empty">
          <h3>Unable to load application</h3>
          <p>{error}</p>
          <Link to="/jobs" className="view-job-btn">
            Back to Jobs
          </Link>
        </div>
      </main>
    );
  }

  const companyName = job?.employer?.companyName || "Company";

  const resumeName = user?.resume
    ? user.resume.split("/").pop()
    : "";

  const resumeUrl = user?.resume
    ? `${import.meta.env.VITE_API_URL?.replace(/\/api$/, "")}${user.resume}`
    : "";

  return (
    <main className="job-details-page">
      <div className="job-details-container">
        <Link to={`/jobs/${id}`} className="job-details-back">
          ← Back to job
        </Link>

        <section className="apply-job-card">
          <div className="apply-job-card-heading">
            <span className="section-eyebrow">APPLICATION</span>
            <h1>Apply for {job.title}</h1>
            <p>{companyName}</p>
          </div>

          <div className="apply-job-summary">
            <span>{job.location}</span>
            <span>{job.jobType}</span>
            <span>{job.workMode}</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                value={
                  user
                    ? `${user.firstName || ""} ${
                        user.lastName || ""
                      }`.trim()
                    : ""
                }
                disabled
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
              />
            </div>

            <div className="form-group">
              <label>Resume</label>

              {user?.resume ? (
                <div className="application-resume">
                  <div className="application-resume-info">
                    <strong>{resumeName}</strong>
                    <span>
                      This resume will be submitted with your
                      application.
                    </span>
                  </div>

                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="application-resume-link"
                  >
                    View resume
                  </a>
                </div>
              ) : (
                <div className="application-resume application-resume-empty">
                  <div className="application-resume-info">
                    <strong>No resume uploaded</strong>
                    <span>
                      Upload a resume from your profile before
                      applying.
                    </span>
                  </div>

                  <Link
                    to="/profile"
                    state={{ returnTo: `/jobs/${id}/apply` }}
                    className="application-resume-link"
                  >
                    Go to profile
                  </Link>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="coverLetter">Cover letter</label>

              <textarea
                id="coverLetter"
                value={coverLetter}
                onChange={(event) =>
                  setCoverLetter(event.target.value)
                }
                placeholder="Tell the employer why you're a good fit for this role..."
                rows={8}
                required
              />
            </div>

            {error && (
              <div className="form-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-success">
                {success}
              </div>
            )}

            <button
              type="submit"
              className="apply-submit-btn"
              disabled={submitting || !user?.resume}
            >
              {submitting
                ? "Submitting..."
                : "Submit application"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ApplyJob;
