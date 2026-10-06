import { Link } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function Home() {
  return (
    <div className="home-page">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Connecting talent with opportunity
            </div>

            <h1>
              Find the right job.
              <span> Build your future.</span>
            </h1>

            <p>
              Discover meaningful career opportunities from companies across
              Nigeria. Search, apply, and take the next step in your career
              journey.
            </p>

            <div className="hero-actions">
              <button className="primary-btn"><Link to="/login" className="primary-btn">
                Find Your Next Job
                <span>→</span></Link>
              </button>

              <button className="secondary-btn"><Link to="/login" className="secondary-btn">
                I'm an Employer
              </Link></button>
            </div>

            <div className="hero-trust">
              <div className="avatar-stack">
                <div className="avatar">A</div>
                <div className="avatar">K</div>
                <div className="avatar">M</div>
                <div className="avatar">T</div>
              </div>

              <div>
                <strong>2,000+</strong>
                <span>job seekers exploring opportunities</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hero-card-top">
                <div>
                  <span className="small-label">Featured opportunity</span>
                  <h3>Frontend Developer</h3>
                </div>

                <div className="bookmark-icon">♡</div>
              </div>

              <div className="company-info">
                <div className="company-logo">T</div>

                <div>
                  <strong>Tech Solutions Ltd.</strong>
                  <span>Lagos, Nigeria</span>
                </div>
              </div>

              <div className="job-tags">
                <span>Full-time</span>
                <span>Remote</span>
                <span>Mid-level</span>
              </div>

              <div className="job-card-bottom">
                <div>
                  <span className="small-label">Salary</span>
                  <strong>₦250k - ₦450k</strong>
                </div>

                <button>Apply now</button>
              </div>
            </div>

            <div className="floating-card floating-card-one">
              <div className="floating-icon success-icon">✓</div>
              <div>
                <strong>Application sent</strong>
                <span>Just now</span>
              </div>
            </div>

            <div className="floating-card floating-card-two">
              <div className="floating-icon purple-icon">★</div>
              <div>
                <strong>12 new jobs</strong>
                <span>Match your profile</span>
              </div>
            </div>

            <div className="hero-circle circle-one"></div>
            <div className="hero-circle circle-two"></div>
          </div>
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section className="search-section" id="jobs">
        <div className="search-container">
          <div className="search-heading">
            <span>EXPLORE OPPORTUNITIES</span>
            <h2>What are you looking for?</h2>
          </div>

          <div className="search-box">
            <div className="search-field">
              <span className="field-icon">⌕</span>
              <div>
                <label>Job title or keyword</label>
                <p>e.g. Frontend Developer</p>
              </div>
            </div>

            <div className="search-divider"></div>

            <div className="search-field">
              <span className="field-icon">⌖</span>
              <div>
                <label>Location</label>
                <p>e.g. Lagos, Nigeria</p>
              </div>
            </div>

            <button className="search-btn"><Link to="/login" className="search-btn">
              Search Jobs
            </Link></button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <strong>1,500+</strong>
            <span>Job Opportunities</span>
          </div>

          <div className="stat-item">
            <strong>500+</strong>
            <span>Companies</span>
          </div>

          <div className="stat-item">
            <strong>2,000+</strong>
            <span>Job Seekers</span>
          </div>

          <div className="stat-item">
            <strong>36</strong>
            <span>States Covered</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section" id="features">
        <div className="section-container">
          <div className="section-heading">
            <span>WHY JRP?</span>
            <h2>Everything you need to move forward</h2>
            <p>
              A simple platform designed to make discovering and applying for
              opportunities easier.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon blue-feature">⌕</div>
              <h3>Discover Opportunities</h3>
              <p>
                Search through opportunities based on your skills, interests,
                location, and career goals.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon green-feature">✓</div>
              <h3>Easy Applications</h3>
              <p>
                Apply for suitable positions and keep track of your
                applications from one place.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon purple-feature">◆</div>
              <h3>Build Your Profile</h3>
              <p>
                Showcase your experience, skills, education, and CV to help
                employers understand your potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
     <section className="how-section" id="how-it-works">
        <div className="section-container">
          <div className="how-content">
            <div className="section-heading left-heading">
              <span>HOW IT WORKS</span>
              <h2>Your next opportunity is just a few steps away.</h2>
              <p>
                Start your job search with a straightforward process designed
                to keep you focused on what matters.
              </p>
            </div>

            <div className="steps">
              <div className="step">
                <div className="step-number">01</div>
                <div>
                  <h3>Create your profile</h3>
                  <p>
                    Tell employers about your experience, skills and career
                    interests.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">02</div>
                <div>
                  <h3>Find opportunities</h3>
                  <p>
                    Browse jobs and use filters to find roles that match what
                    you're looking for.
                  </p>
                </div>
              </div>

              <div className="step">
                <div className="step-number">03</div>
                <div>
                  <h3>Apply and track</h3>
                  <p>
                    Submit your application and monitor its progress from your
                    dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="section-container">
          <div className="section-heading">
            <span>SUCCESS STORIES</span>
            <h2>Built around people and opportunities</h2>
            <p>
              Illustrative experiences showing how a simpler job search can
              feel.
            </p>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="quote-mark">“</div>

              <p>
                The process felt much easier because I could search for roles
                and keep track of my applications in one place.
              </p>

              <div className="testimonial-person">
                <div className="person-avatar">C</div>
                <div>
                  <strong>Chiamaka O.</strong>
                  <span>Software Developer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card featured-testimonial">
              <div className="quote-mark">“</div>

              <p>
                Having relevant opportunities organized in one place made it
                easier to focus on positions that actually matched my skills.
              </p>

              <div className="testimonial-person">
                <div className="person-avatar">D</div>
                <div>
                  <strong>David A.</strong>
                  <span>Product Designer</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <div className="quote-mark">“</div>

              <p>
                A clean profile helped me present my experience clearly when
                applying for new opportunities.
              </p>

              <div className="testimonial-person">
                <div className="person-avatar">F</div>
                <div>
                  <strong>Fatima M.</strong>
                  <span>Business Analyst</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-container">
          <div>
            <span>READY FOR YOUR NEXT STEP?</span>
            <h2>Start exploring opportunities today.</h2>
            <p>
              Create your profile and discover opportunities that could be your
              next career move.
            </p>
          </div>

          <Link to="/login" className="cta-btn">
            Explore Jobs
            <span>→</span></Link>
          
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;