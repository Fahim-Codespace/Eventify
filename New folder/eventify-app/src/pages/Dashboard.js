
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Dummy authentication and user role
const getUser = () => {
  // Replace with real auth logic
  return JSON.parse(localStorage.getItem('eventifyUser'));
};

function Dashboard() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
    if (!currentUser) setShowPopup(true);
  }, []);

  if (showPopup) {
    return (
      <div className="container py-5 text-center">
        <div className="alert alert-warning" role="alert">
          Please <a href="/login">login</a> or <a href="/signup">sign up</a> to access the dashboard.
        </div>
      </div>
    );
  }

  if (user?.role === 'admin') {
    // Admin Dashboard
    return (
      <div className="container py-5">
        <nav className="mb-4 d-flex gap-3">
          <a href="/dashboard" className="btn btn-outline-primary">Dashboard</a>
          <a href="/create-event" className="btn btn-outline-success">Create Event</a>
          <a href="/logout" className="btn btn-outline-danger">Logout</a>
        </nav>
        <h2>Admin Dashboard</h2>
        <div className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Events</h5>
                <p className="card-text">12</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Upcoming Events</h5>
                <p className="card-text">3</p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-title">Total Attendees</h5>
                <p className="card-text">120</p>
              </div>
            </div>
          </div>
        </div>
        <h4>All Events</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Annual Meetup</td>
              <td>2025-09-10</td>
              <td>Upcoming</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Workshop</td>
              <td>2025-08-30</td>
              <td>Completed</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  // Student Dashboard
  return (
    <div className="container py-5">
      <nav className="mb-4 d-flex gap-3">
        <a href="/my-events" className="btn btn-outline-primary">My Events</a>
        <a href="/events" className="btn btn-outline-success">All Events</a>
        <a href="/logout" className="btn btn-outline-danger">Logout</a>
      </nav>
      <h2>Student Dashboard</h2>
      <h4>Registered Events</h4>
      <ul className="list-group mb-4">
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Hackathon 2025 <span>2025-09-15</span> <span className="badge bg-success">Registered</span>
          <button className="btn btn-sm btn-outline-danger ms-3">Unregister</button>
        </li>
        <li className="list-group-item d-flex justify-content-between align-items-center">
          Coding Bootcamp <span>2025-08-28</span> <span className="badge bg-success">Registered</span>
          <button className="btn btn-sm btn-outline-danger ms-3">Unregister</button>
        </li>
      </ul>
      {/* Optional Profile Section */}
      <div className="card" style={{maxWidth: '400px'}}>
        <div className="card-body">
          <h5 className="card-title">Profile</h5>
          <p className="card-text">Name: John Doe</p>
          <p className="card-text">Email: johndoe@email.com</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
