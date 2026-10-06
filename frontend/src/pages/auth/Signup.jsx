import { useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function Signup() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    accountType: "candidate",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    location: "",
    experienceLevel: "",
    desiredRole: "",
  });

  const [error, setError] = useState("");

  const returnTo = location.state?.from || "/jobs";

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (
      formData.accountType === "employer" &&
      !formData.companyName.trim()
    ) {
      setError("Company name is required for employer accounts.");
      return;
    }

    const accountData = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
      role: formData.accountType,
    };

    if (formData.accountType === "employer") {
      accountData.companyName = formData.companyName.trim();
      accountData.location = formData.location;
    } else {
      accountData.location = formData.location;
      accountData.experienceLevel = formData.experienceLevel;
      accountData.desiredRole = formData.desiredRole.trim();
    }

    try {
      await signup(accountData);

      if (formData.accountType === "employer") {
        navigate("/employer/dashboard", {
          replace: true,
        });
      } else {
        navigate(returnTo, {
          replace: true,
        });
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
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

        <div className="auth-card auth-card-wide">
          <div className="auth-header">
            <span className="section-eyebrow">
              GET STARTED
            </span>

            <h1>Create your JRP account</h1>

            <p>
              Choose your account type and get started.
            </p>
          </div>

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="accountType">
                Account type
              </label>

              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                required
              >
                <option value="candidate">
                  Candidate — Looking for a job
                </option>

                <option value="employer">
                  Employer — Hiring candidates
                </option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">
                  First name
                </label>

                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">
                  Last name
                </label>

                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email address
              </label>

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

            {formData.accountType === "employer" && (
              <div className="form-group">
                <label htmlFor="companyName">
                  Company name
                </label>

                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  placeholder="e.g. Test Engineering Ltd"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">
                  Password
                </label>

                <input
  id="password"
  name="password"
  type="password"
  placeholder="6–8 characters"
  value={formData.password}
  onChange={handleChange}
  autoComplete="new-password"
  maxLength={12}
  required
/>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm password
                </label>

                <input
  id="confirmPassword"
  name="confirmPassword"
  type="password"
  placeholder="Repeat your password"
  value={formData.confirmPassword}
  onChange={handleChange}
  autoComplete="new-password"
  maxLength={8}
  required
/>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">
                  Location
                </label>

                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select your location
                  </option>

                  <option value="Lagos">Lagos</option>
                  <option value="Abuja">Abuja</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {formData.accountType === "candidate" && (
                <div className="form-group">
                  <label htmlFor="experienceLevel">
                    Experience level
                  </label>

                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select experience
                    </option>

                    <option value="Entry level">
                      Entry level
                    </option>

                    <option value="1-2 years">
                      1–2 years
                    </option>

                    <option value="3-4 years">
                      3–4 years
                    </option>

                    <option value="5+ years">
                      5+ years
                    </option>
                  </select>
                </div>
              )}
            </div>

            {formData.accountType === "candidate" && (
              <div className="form-group">
                <label htmlFor="desiredRole">
                  Desired job role
                </label>

                <input
                  id="desiredRole"
                  name="desiredRole"
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={formData.desiredRole}
                  onChange={handleChange}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Create Account
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?{" "}

              <Link
                to="/login"
                state={{
                  from: returnTo,
                }}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;