import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="brand">
          <div className="brand-mark">J</div>
          <span>JRP</span>
        </Link>

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

          <button
            className="mobile-menu"
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;