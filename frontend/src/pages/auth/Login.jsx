import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const returnTo = location.state?.from || "/jobs";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await login(
        formData.email.trim(),
        formData.password,
      );

      if (location.state?.from) {
        navigate(returnTo, { replace: true });
        return;
      }

      if (user.role === "employer") {
        navigate("/employer/dashboard", { replace: true });
      } else if (user.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/jobs", { replace: true });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Login failed. Please check your email and password.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-brand">
          <Link to="/" className="brand">
            <div className="brand-mark">J</div>
            <span>JRP</span>
          </Link>
        </div>

        <div className="auth-card">
          <div className="auth-header">
            <span className="section-eyebrow">WELCOME BACK</span>

            <h1>Log in to your account</h1>

            <p>
              Continue your job search and manage your applications.
            </p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email address</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
  id="password"
  name="password"
  type="password"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  autoComplete="current-password"
  maxLength={12}
  required
/>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                state={{
                  from: returnTo,
                }}
              >
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

