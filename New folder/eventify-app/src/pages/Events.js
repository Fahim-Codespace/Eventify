import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import "./Events.css";

const initialEvents = [
  {
    id: 1,
    title: "Tech Conference 2025",
    description: "A full-day event discussing the latest in tech innovations.",
    about: "Join industry leaders and innovators to explore cutting-edge technologies shaping the future.",
    date: "2025-09-15",
    time: "10:00 AM - 6:00 PM",
    location: "Ahsanullah University Auditorium",
    organizer: "CSE Club",
    participants: 42,
  },
  {
    id: 2,
    title: "AI Workshop",
    description: "Hands-on session on AI and machine learning techniques.",
    about: "Learn practical AI skills from experts in an interactive workshop environment.",
    date: "2025-10-10",
    time: "1:00 PM - 4:00 PM",
    location: "AUST Lab Room 3B",
    organizer: "AI Society",
    participants: 30,
  },
  {
    id: 3,
    title: "Coding Marathon",
    description: "24-hour coding competition for all students.",
    about: "Test your coding skills in a thrilling 24-hour hackathon with exciting prizes.",
    date: "2025-11-05",
    time: "9:00 AM - 9:00 AM",
    location: "AUST Main Hall",
    organizer: "Programming Club",
    participants: 60,
  },
];

const Events = ({ isAdmin = false }) => {
  const [events, setEvents] = useState(initialEvents);
  const [registeredEvents, setRegisteredEvents] = useState({});
  const [showRegistration, setShowRegistration] = useState(null);
  const [showAbout, setShowAbout] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    semester: "",
    studentId: "",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    about: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    participants: 0,
  });

  const departments = ["CSE", "EEE", "Civil", "Mechanical", "Architecture", "BBA"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];

  const handleRegister = (eventId) => {
    if (!registeredEvents[eventId]) {
      setShowRegistration(eventId);
    } else {
      setRegisteredEvents({ ...registeredEvents, [eventId]: false });
      setEvents(
        events.map((event) =>
          event.id === eventId
            ? { ...event, participants: event.participants - 1 }
            : event
        )
      );
    }
  };

  const handleFormSubmit = (e, eventId) => {
    e.preventDefault();
    setRegisteredEvents({ ...registeredEvents, [eventId]: true });
    setEvents(
      events.map((event) =>
        event.id === eventId
          ? { ...event, participants: event.participants + 1 }
          : event
      )
    );
    setShowRegistration(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newId = events.length + 1;
    setEvents([...events, { ...newEvent, id: newId, participants: 0 }]);
    setShowAddEvent(false);
    setNewEvent({
      title: "",
      description: "",
      about: "",
      date: "",
      time: "",
      location: "",
      organizer: "",
      participants: 0,
    });
  };

  const closeModal = () => {
    setShowRegistration(null);
    setShowAbout(null);
    setShowAddEvent(false);
  };

  return (
    <Container className="events-page">
      <Row className="justify-content-center mb-4">
        <Col md={10}>
          <div className="minimal-banner">
            <h1 className="banner-title">Upcoming Events</h1>
          </div>
        </Col>
      </Row>

      {isAdmin && (
        <Row className="justify-content-center mb-4">
          <Col md={10} className="text-center">
            <Button className="add-event-btn" onClick={() => setShowAddEvent(true)}>
              Post New Event
            </Button>
          </Col>
        </Row>
      )}

      <Row className="justify-content-center">
        {events.map((event) => (
          <Col md={10} key={event.id} className="mb-4">
            <Card className="event-card">
              <Card.Body className="p-4">
                <h2 className="event-title">{event.title}</h2>
                <p className="event-description">{event.description}</p>
                <Row className="event-details mt-3">
                  <Col md={6}>
                    <p><i className="fas fa-calendar-alt me-2"></i> <span>Date:</span> {event.date}</p>
                    <p><i className="fas fa-clock me-2"></i> <span>Time:</span> {event.time}</p>
                    <p><i className="fas fa-map-marker-alt me-2"></i> <span>Location:</span> {event.location}</p>
                  </Col>
                  <Col md={6}>
                    <p><i className="fas fa-users me-2"></i> <span>Organizer:</span> {event.organizer}</p>
                    <p><i className="fas fa-user-friends me-2"></i> <span>Participants:</span> {event.participants}</p>
                  </Col>
                </Row>
                <div className="text-center mt-3 d-flex justify-content-center gap-3">
                  <Button
                    className="about-btn"
                    onClick={() => setShowAbout(event.id)}
                  >
                    About
                  </Button>
                  <Button
                    className={`register-btn ${registeredEvents[event.id] ? "registered" : ""}`}
                    onClick={() => handleRegister(event.id)}
                  >
                    {registeredEvents[event.id] ? "Leave" : "Join"}
                  </Button>
                  {registeredEvents[event.id] && (
                    <Button
                      className="btn btn-success"
                      onClick={() => {
                        localStorage.setItem('certificateEvent', JSON.stringify(event));
                        localStorage.setItem('certificateUser', JSON.stringify(formData));
                        window.location.href = '/certificate';
                      }}
                    >
                      Get Certificate
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showRegistration !== null} onHide={closeModal} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Register for {events.find((e) => e.id === showRegistration)?.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={(e) => handleFormSubmit(e, showRegistration)}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Semester</Form.Label>
              <Form.Select
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your semester</option>
                {semesters.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem} Semester
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                placeholder="Enter your student ID"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showAbout !== null} onHide={closeModal} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>{events.find((e) => e.id === showAbout)?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="neon-banner">
            <h2 className="neon-title">{events.find((e) => e.id === showAbout)?.title}</h2>
            <p className="neon-text">{events.find((e) => e.id === showAbout)?.about}</p>
          </div>
          <div className="text-center mt-4">
            <Button
              className="register-btn"
              onClick={() => {
                setShowAbout(null);
                handleRegister(showAbout);
              }}
            >
              Register Now
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showAddEvent} onHide={closeModal} centered>
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>Post New Event</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddEvent}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={newEvent.title}
                onChange={handleNewEventChange}
                required
                placeholder="Enter event title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newEvent.description}
                onChange={handleNewEventChange}
                required
                placeholder="Enter event description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>About</Form.Label>
              <Form.Control
                as="textarea"
                name="about"
                value={newEvent.about}
                onChange={handleNewEventChange}
                required
                placeholder="Enter about event"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleNewEventChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="text"
                name="time"
                value={newEvent.time}
                onChange={handleNewEventChange}
                required
                placeholder="e.g., 10:00 AM - 6:00 PM"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newEvent.location}
                onChange={handleNewEventChange}
                required
                placeholder="Enter event location"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Organizer</Form.Label>
              <Form.Control
                type="text"
                name="organizer"
                value={newEvent.organizer}
                onChange={handleNewEventChange}
                required
                placeholder="Enter organizer name"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Post Event
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default Events;

