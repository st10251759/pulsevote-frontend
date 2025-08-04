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
      <div className="page-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={fetchProtectedData} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1>Welcome to Your Dashboard</h1>
          <p>Manage your polls and view analytics from here</p>
        </div>

        <div className="dashboard-content">
          <div className="welcome-card">
            <h2>🎉 Welcome Back!</h2>
            <p>{user?.message}</p>
            {user?.timestamp && (
              <small>Last accessed: {new Date(user.timestamp).toLocaleString()}</small>
            )}
          </div>

          <div className="dashboard-grid">
            <div className="dashboard-card">
              <div className="card-icon">📊</div>
              <h3>Create New Poll</h3>
              <p>Start gathering responses with a new poll</p>
              <button className="btn btn-primary">Coming Soon</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">📈</div>
              <h3>My Polls</h3>
              <p>View and manage your existing polls</p>
              <button className="btn btn-secondary">Coming Soon</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">👥</div>
              <h3>Analytics</h3>
              <p>Deep dive into your poll performance</p>
              <button className="btn btn-secondary">Coming Soon</button>
            </div>

            <div className="dashboard-card">
              <div className="card-icon">⚙️</div>
              <h3>Settings</h3>
              <p>Manage your account and preferences</p>
              <button className="btn btn-secondary">Coming Soon</button>
            </div>
          </div>

          <div className="recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">✅</div>
                <div className="activity-content">
                  <p><strong>Account Created</strong></p>
                  <small>Welcome to PulseVote! Your account is ready to use.</small>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">🔐</div>
                <div className="activity-content">
                  <p><strong>Secure Login</strong></p>
                  <small>You've successfully logged in with secure authentication.</small>
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