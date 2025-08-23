

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

function EventifyNavbar() {
  const location = useLocation();
  return (
    <Navbar bg="white" expand="md" className="eventify-navbar" style={{borderRadius: '32px', boxShadow: '0 4px 32px rgba(0,0,0,0.08)', margin: '32px auto 0 auto', maxWidth: '1100px', padding: '0.5rem 2.5rem'}}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="/logo192.png" alt="Eventify Logo" className="navbar-logo-img" style={{width: '48px', height: '48px', marginRight: '8px'}} />
          <span className="navbar-brand-text" style={{fontSize: '1.6rem', fontWeight: 700, color: '#222', letterSpacing: '1px'}}>Eventify</span>
        </Navbar.Brand>
        <Nav className="mx-auto navbar-center" style={{gap: '40px'}}>
          <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>Home</Nav.Link>
          <Nav.Link as={Link} to="/about" className={location.pathname === '/about' ? 'nav-link active' : 'nav-link'}>About</Nav.Link>
          <Nav.Link as={Link} to="/events" className={location.pathname === '/events' ? 'nav-link active' : 'nav-link'}>Events</Nav.Link>
          <Nav.Link as={Link} to="/Login" className={location.pathname === '/Login' ? 'nav-link active' : 'nav-link'}>Login</Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          <Button as={Link} to="/Signup" variant="primary" className="navbar-signup-btn">Sign Up</Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default EventifyNavbar;
