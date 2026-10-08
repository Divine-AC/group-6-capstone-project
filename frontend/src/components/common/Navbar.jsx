import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="brand-mark">J</div>
          <span>JRP</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {!user && (
            <>
              <Link to="/login">Find Jobs</Link>
              <a href="#features">Why JRP</a>
              <a href="#how-it-works">How It Works</a>
            </>
          )}

          {user?.role === "candidate" && (
            <>
              <Link to="/candidate/dashboard">Dashboard</Link>
              <Link to="/jobs">Find Jobs</Link>
              <Link to="/applications">Applications</Link>
              <Link to="/profile">Profile</Link>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard">Dashboard</Link>
              <Link to="/employer/jobs">My Jobs</Link>
              <Link to="/employer/jobs/new">Post Job</Link>
              <Link to="/employer/profile">Profile</Link>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard">Dashboard</Link>
              <Link to="/admin/users">Users</Link>
              <Link to="/admin/jobs">Jobs</Link>
              <Link to="/admin/applications">Applications</Link>
              <Link to="/admin/reports">Reports</Link>
            </>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="nav-actions">
          {!user ? (
            <>
              <Link to="/login" className="login-btn">
                Log in
              </Link>

              <Link to="/signup" className="signup-btn">
                Get Started
              </Link>
            </>
          ) : (
            <button
              type="button"
              className="login-btn"
              onClick={handleLogout}
            >
              Log out
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-menu"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          {!user && (
            <>
              <Link to="/login" onClick={closeMenu}>
                Log in
              </Link>

              <Link
                to="/signup"
                className="mobile-signup"
                onClick={closeMenu}
              >
                Sign Up
              </Link>
            </>
          )}

          {user?.role === "candidate" && (
            <>
              <Link to="/jobs" onClick={closeMenu}>
                Find Jobs
              </Link>

              <Link to="/candidate/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/applications" onClick={closeMenu}>
                Applications
              </Link>

              <Link to="/profile" onClick={closeMenu}>
                Profile
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}

          {user?.role === "employer" && (
            <>
              <Link to="/employer/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/employer/jobs" onClick={closeMenu}>
                My Jobs
              </Link>

              <Link to="/employer/jobs/new" onClick={closeMenu}>
                Post Job
              </Link>

              <Link to="/employer/profile" onClick={closeMenu}>
                Profile
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}

          {user?.role === "admin" && (
            <>
              <Link to="/admin/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>

              <Link to="/admin/users" onClick={closeMenu}>
                Users
              </Link>

              <Link to="/admin/jobs" onClick={closeMenu}>
                Jobs
              </Link>

              <Link to="/admin/applications" onClick={closeMenu}>
                Applications
              </Link>

              <Link to="/admin/reports" onClick={closeMenu}>
                Reports
              </Link>

              <button
                type="button"
                className="mobile-logout"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;