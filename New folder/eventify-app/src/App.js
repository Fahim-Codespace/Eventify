
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventifyNavbar from './components/Navbar';
import Home from './pages/Home';
import connect from './Server/connect';

function About() {
  return (
    <div className="container py-5">
      <h2>About Eventify</h2>
      <p>This platform is designed to make university club event management easy and efficient for both students and club admins.</p>
    </div>
  );
}
function Signup() {
  return (
    <div className="container py-5 text-center">
      <h2>Signup Page</h2>
      <p>Signup functionality coming soon!</p>
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
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
