import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import './Navbar.css'; // We'll create this CSS file

function EventifyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in - improved version
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    // Check immediately on component mount
    checkAuthStatus();

    // Set up interval to check auth status periodically
    const intervalId = setInterval(checkAuthStatus, 1000); // Check every second

    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    // Custom event listener for login/logout within same tab
    const handleAuthChange = () => checkAuthStatus();
    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', checkAuthStatus);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Create a custom event to trigger auth status check
  const triggerAuthCheck = () => {
    window.dispatchEvent(new Event('authChange'));
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    triggerAuthCheck(); // Trigger auth check
    navigate('/');
  };

  return (
    <Navbar bg="white" expand="md" className="eventify-navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/main_logo.png" alt="Eventify Logo" className="navbar-logo-img" />
          <span className="navbar-brand-text">Eventify</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto navbar-center" style={{gap: '40px'}}>
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About</Nav.Link>
            <Nav.Link as={Link} to="/Events" className={location.pathname === '/Events' ? 'nav-link active' : 'nav-link'}>Events</Nav.Link>
          </Nav>
          <Nav className="navbar-right">
            {isLoggedIn ? (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="outline-primary"
                  id="dropdown-basic"
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#495057',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span style={{
                    background: user?.role === 'admin' ? '#d4edda' : '#d1ecf1',
                    color: user?.role === 'admin' ? '#155724' : '#0c5460',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px'
                  }}>
                    👋 {user?.name}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/profile">👤 My Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/my-events">📅 My Events</Dropdown.Item>
                  {user?.role === 'admin' && (
                    <Dropdown.Item as={Link} to="/admin">⚙️ Admin Panel</Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} style={{color: '#dc3545'}}>🚪 Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div className="d-flex align-items-center" style={{gap: '16px'}}>
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}
                  style={{fontWeight: '500', color: '#6c757d'}}
                >
                  Login
                </Nav.Link>
                <Button as={Link} to="/signup" variant="primary" className="navbar-signup-btn" style={{borderRadius: '12px', padding: '8px 20px'}}>
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EventifyNavbar;