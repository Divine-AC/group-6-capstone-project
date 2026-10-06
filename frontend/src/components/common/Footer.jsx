import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="brand footer-logo">
              <div className="brand-mark">J</div>
              <span>JRP</span>
            </Link>

            <p>
              Connecting job seekers with opportunities and helping employers
              discover talent.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <Link to="/jobs">Find Jobs</Link>
              <Link to="/login">For Employers</Link>
              <a href="#how-it-works">How It Works</a>
            </div>

           <div className="footer-column">
  <h4>Company</h4>
  <span>About Us</span>
  <span>Contact</span>
  <span>Careers</span>
</div>

<div className="footer-column">
  <h4>Legal</h4>
  <span>Privacy Policy</span>
  <span>Terms of Service</span>
</div>


          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 JRP. All rights reserved.</p>

          <p className="demo-notice">
            JRP is an educational capstone project. Listings and testimonials
            shown are illustrative.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

