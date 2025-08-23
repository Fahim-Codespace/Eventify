import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

function EventifyNavbar() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check if user is logged in
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

    checkAuthStatus();

    // Listen for storage changes (login/logout from other tabs)
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <Navbar bg="white" expand="md" className="eventify-navbar" style={{borderRadius: '32px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', margin: '32px auto 0 auto', maxWidth: '1100px', padding: '0.5rem 2.5rem'}}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/main_logo.png" alt="Eventify Logo" className="navbar-logo-img" style={{width: '48px', height: '48px', marginRight: '8px'}} />
          <span className="navbar-brand-text" style={{fontSize: '1.6rem', fontWeight: 700, color: '#222', letterSpacing: '1px'}}>Eventify</span>
        </Navbar.Brand>
        
        <Nav className="navbar-right" style={{gap: '40px'}}>
          <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Nav.Link>
          <Nav.Link as={Link} to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-link active' : 'nav-link'}>Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/events" className={location.pathname === '/events' ? 'nav-link active' : 'nav-link'}>Events</Nav.Link>
          <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'nav-link active' : 'nav-link'}>Login</Nav.Link>
          <Button as={Link} to="/signup" variant="primary" className="navbar-signup-btn">Sign Up</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default EventifyNavbar;