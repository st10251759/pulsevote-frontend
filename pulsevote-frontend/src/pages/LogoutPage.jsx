import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pages.css';

const LogoutPage = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout
    onLogout();
    
    // Redirect to home page after a brief delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLogout, navigate]);

  return (
    <div className="page-container">
      <div className="logout-container">
        <div className="logout-card">
          <div className="logout-icon">👋</div>
          <h1>You've Been Logged Out</h1>
          <p>Thank you for using PulseVote. You have been securely logged out.</p>
          <div className="logout-actions">
            <button 
              onClick={() => navigate('/')} 
              className="btn btn-primary"
            >
              Go to Home
            </button>
            <button 
              onClick={() => navigate('/login')} 
              className="btn btn-secondary"
            >
              Sign In Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;