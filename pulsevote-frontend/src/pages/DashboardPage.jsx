import { useState, useEffect } from 'react';
import axios from 'axios';
import './Pages.css';

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProtectedData();
  }, []);

  const fetchProtectedData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://localhost:5000/api/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Extract user info from response
      setUser({
        message: response.data.message,
        timestamp: response.data.timestamp
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="error-container">
          <div className="error-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchProtectedData} className="btn btn-primary">
            <i className="fas fa-redo"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <div className="header-text">
              <h1>Dashboard</h1>
              <p>Manage your polls and view analytics from here</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary">
                <i className="fas fa-plus"></i>
                Create Poll
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-icon">
              <i className="fa-solid fa-circle-user"></i>
            </div>
            <div className="welcome-content">
              <h2>Welcome Back!</h2>
              <p>{user?.message}</p>
              {user?.timestamp && (
                <div className="timestamp">
                  <i className="far fa-clock"></i>
                  Last accessed: {new Date(user.timestamp).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon primary">
                <i className="fas fa-poll"></i>
              </div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Total Polls</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon success">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Total Responses</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon warning">
                <i className="fas fa-chart-line"></i>
              </div>
              <div className="stat-content">
                <h3>0%</h3>
                <p>Response Rate</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon info">
                <i className="fas fa-eye"></i>
              </div>
              <div className="stat-content">
                <h3>0</h3>
                <p>Poll Views</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="dashboard-main">
          <div className="main-grid">
            {/* Quick Actions */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Quick Actions</h3>
                <p>Get started with these common tasks</p>
              </div>
              <div className="action-cards">
                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-plus-circle"></i>
                  </div>
                  <div className="action-content">
                    <h4>Create New Poll</h4>
                    <p>Start gathering responses with a new poll</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Coming Soon
                  </button>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-list-alt"></i>
                  </div>
                  <div className="action-content">
                    <h4>My Polls</h4>
                    <p>View and manage your existing polls</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Coming Soon
                  </button>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-chart-bar"></i>
                  </div>
                  <div className="action-content">
                    <h4>Analytics</h4>
                    <p>Deep dive into your poll performance</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Coming Soon
                  </button>
                </div>

                <div className="action-card">
                  <div className="action-icon">
                    <i className="fas fa-cog"></i>
                  </div>
                  <div className="action-content">
                    <h4>Settings</h4>
                    <p>Manage your account and preferences</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="dashboard-section">
              <div className="section-header">
                <h3>Recent Activity</h3>
                <p>Your latest actions and updates</p>
              </div>
              <div className="activity-feed">
                <div className="activity-item">
                  <div className="activity-icon success">
                    <i className="fas fa-check-circle"></i>
                  </div>
                  <div className="activity-content">
                    <h4>Account Created</h4>
                    <p>Welcome to PulseVote! Your account is ready to use.</p>
                    <span className="activity-time">Just now</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon primary">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="activity-content">
                    <h4>Secure Login</h4>
                    <p>You've successfully logged in with secure authentication.</p>
                    <span className="activity-time">2 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon info">
                    <i className="fas fa-info-circle"></i>
                  </div>
                  <div className="activity-content">
                    <h4>Getting Started</h4>
                    <p>Explore the dashboard to create your first poll.</p>
                    <span className="activity-time">5 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;