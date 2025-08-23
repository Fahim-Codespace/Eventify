import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EventifyNavbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup'; // Import the correct Signup component
import Events from './pages/Events';
import 'bootstrap/dist/css/bootstrap.min.css';

function About() {
  // Keep this component or import a separate About page if you've created one
  return (
    <div className="container py-5">
      <h2>About Eventify</h2>
      <p>This platform is designed to make university club event management easy and efficient for both students and club admins.</p>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;