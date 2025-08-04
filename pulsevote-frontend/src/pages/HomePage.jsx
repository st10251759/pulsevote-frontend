import { Link } from 'react-router-dom';
import './Pages.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-shapes">
            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
            <div className="shape shape-3"></div>
            <div className="shape shape-4"></div>
          </div>
        </div>
        
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <i className="fas fa-crown"></i>
              <span>Trusted by 50,000+ Organizations</span>
            </div>
            
            <h1 className="hero-title">
              Create <span className="gradient-text">Powerful Polls</span> That 
              <br />Drive Real Results
            </h1>
            
            <p className="hero-subtitle">
              Build secure, real-time polls and surveys that engage your audience and deliver 
              actionable insights. Join the leading platform for modern polling solutions.
            </p>
            
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                <i className="fas fa-rocket"></i>
                Start Free Trial
                <div className="btn-shine"></div>
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                <i className="far fa-user"></i>
                Sign In
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Active Users</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <i className="fas fa-poll"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">2M+</span>
                  <span className="stat-label">Polls Created</span>
                </div>
              </div>
              <div className="stat">
                <div className="stat-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="stat-content">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="dashboard-preview">
              <div className="preview-glow"></div>
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="preview-title">
                  <i className="fas fa-broadcast-tower pulse-animation"></i>
                  Live Poll Results
                </div>
              </div>
              <div className="preview-content">
                <div className="poll-question">
                  What's your favorite development framework?
                </div>
                <div className="poll-options">
                  <div className="poll-option">
                    <span className="option-text">React</span>
                    <div className="option-bar">
                      <div className="option-fill" style={{width: '45%'}} data-percentage="45"></div>
                    </div>
                    <span className="option-percent">45%</span>
                  </div>
                  <div className="poll-option">
                    <span className="option-text">Vue.js</span>
                    <div className="option-bar">
                      <div className="option-fill" style={{width: '32%'}} data-percentage="32"></div>
                    </div>
                    <span className="option-percent">32%</span>
                  </div>
                  <div className="poll-option">
                    <span className="option-text">Angular</span>
                    <div className="option-bar">
                      <div className="option-fill" style={{width: '23%'}} data-percentage="23"></div>
                    </div>
                    <span className="option-percent">23%</span>
                  </div>
                </div>
                <div className="poll-live">
                  <div className="live-indicator"></div>
                  <span><strong>1,247</strong> responses • Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <i className="fas fa-magic"></i>
              <span>Powerful Features</span>
            </div>
            <h2>Everything you need to create <br /><em>amazing polls</em></h2>
            <p>Professional-grade tools designed for modern teams and organizations</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card" data-aos="fade-up" data-aos-delay="100">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Enterprise Security</h3>
              <p>Bank-level encryption, GDPR compliance, and advanced security features to protect your data and respondent privacy.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="200">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-bolt"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Real-time Analytics</h3>
              <p>Watch responses flow in live, get instant insights, and make data-driven decisions with our powerful analytics dashboard.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="300">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-chart-pie"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Advanced Insights</h3>
              <p>Deep dive into response patterns, demographic breakdowns, and trend analysis with comprehensive reporting tools.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="400">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-palette"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Custom Branding</h3>
              <p>Brand your polls with custom themes, colors, and layouts. Create polls that match your organization's identity.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="500">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Global Reach</h3>
              <p>Multi-language support, global CDN, and 99.9% uptime ensure your polls reach audiences worldwide.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>

            <div className="feature-card" data-aos="fade-up" data-aos-delay="600">
              <div className="feature-icon-wrapper">
                <div className="feature-icon">
                  <i className="fas fa-plug"></i>
                </div>
                <div className="icon-bg"></div>
              </div>
              <h3>Easy Integration</h3>
              <p>Seamlessly integrate with your existing tools through our robust API, webhooks, and pre-built integrations.</p>
              <div className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="social-proof-section">
        <div className="container">
          <p className="social-proof-text">Trusted by leading companies worldwide</p>
          <div className="company-logos">
            <div className="logo-item">Microsoft</div>
            <div className="logo-item">Google</div>
            <div className="logo-item">Amazon</div>
            <div className="logo-item">Netflix</div>
            <div className="logo-item">Spotify</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-background">
          <div className="cta-pattern"></div>
        </div>
        <div className="container">
          <div className="cta-content">
            <div className="cta-icon">
              <i className="fas fa-rocket"></i>
            </div>
            <h2>Ready to transform how you <br />gather feedback?</h2>
            <p>Join thousands of satisfied customers who trust PulseVote for their polling and survey needs. Start your journey today.</p>
            
            <div className="cta-buttons">
              <Link to="/register" className="btn btn-cta btn-large">
                <i className="fas fa-play"></i>
                Start Free Trial
                <div className="btn-shine"></div>
              </Link>
            </div>
            
            <div className="cta-features">
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>No credit card required</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>14-day free trial</span>
              </div>
              <div className="cta-feature">
                <i className="fas fa-check"></i>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;