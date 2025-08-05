import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import LogoutPage from './pages/LogoutPage';
import CSPTestPage from './pages/CSPTestPage'; // Added CSP test page

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on app load
    const token = localStorage.getItem('token');
    if (token) {
      // You could validate the token here by calling the backend
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading PulseVote...</p>
      </div>
    );
  }

  return (
    <Router>
      <Layout isAuthenticated={isAuthenticated} onLogout={logout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={<LoginPage onLogin={login} />} 
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/logout" 
            element={<LogoutPage onLogout={logout} />} 
          />
          {/* CSP Test Route - Available for security testing */}
          <Route 
            path="/csp-test" 
            element={<CSPTestPage />} 
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;