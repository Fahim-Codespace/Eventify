
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventifyNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Events from './pages/Events';
import CertificateGenerator from './pages/CertificateGenerator';
import Dashboard from './pages/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './pages/Profile';
function About() {
  return (
    <div
      className="about-bg-container"
      style={{
        minHeight: '100vh',
        backgroundImage: 'url(/about-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{
        background: 'rgba(255,255,255,0.85)',
        minHeight: '100vh',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2
      }}>
        <div className="container py-5">
          <h2 className="mb-4" align="center" style={{ color: "#007bff" }}>About Eventify</h2>
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="card shadow-sm p-4">
                <h4 className="mb-3">Empowering University Clubs & Students</h4>
                <p>
                  <strong>Eventify</strong> is a modern platform designed to streamline university club event management for both students and club administrators. Our mission is to make organizing, joining, and tracking events simple, transparent, and rewarding.
                </p>
                <ul className="list-group list-group-flush mb-3">
                  <li className="list-group-item">✔️ <strong>Easy Event Creation:</strong> Club admins can create and manage events with just a few clicks.</li>
                  <li className="list-group-item">✔️ <strong>Effortless Participation:</strong> Students can browse, join, and leave events seamlessly.</li>
                  <li className="list-group-item">✔️ <strong>Certificate Generator:</strong> Automatic branded certificates for event participants, with admin approval workflow.</li>
                  <li className="list-group-item">✔️ <strong>Role-Based Dashboards:</strong> Personalized dashboards for students and admins.</li>
                  <li className="list-group-item">✔️ <strong>Secure Authentication:</strong> Fast and secure login/signup for all users.</li>
                  <li className="list-group-item">✔️ <strong>Real-Time Updates:</strong> Stay informed about upcoming events and your participation status.</li>
                </ul>
                <h5 className="mt-4">Why Choose Eventify?</h5>
                <p>
                  Eventify brings together the best practices of event management, digital certification, and user experience. Whether you're a club leader or a student, our platform helps you focus on what matters: building community, learning, and celebrating achievements.
                </p>
                <div className="mt-3">
                  <strong>Contact Us:</strong> <br />
                  Email: <a href="mailto:support@eventify.com">support@eventify.com</a> <br />
                  Follow us on <a href="https://facebook.com/eventify" target="_blank" rel="noopener noreferrer">Facebook</a> & <a href="https://twitter.com/eventify" target="_blank" rel="noopener noreferrer">Twitter</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <EventifyNavbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/certificate" element={<CertificateGenerator />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;