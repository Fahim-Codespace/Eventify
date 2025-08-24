import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function CertificateAdmin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/api/certificate/applications');
      setApplications(res.data);
    } catch (err) {
      setError('Failed to fetch applications');
    }
    setLoading(false);
  };

  const approveApplication = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/certificate/approve/${id}`);
      fetchApplications();
    } catch (err) {
      setError('Failed to approve application');
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Certificate Applications</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Student ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.eventTitle}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.department}</td>
                <td>{app.semester}</td>
                <td>{app.studentId}</td>
                <td>{app.status}</td>
                <td>
                  {app.status === 'pending' ? (
                    <Button variant="success" size="sm" onClick={() => approveApplication(app._id)}>
                      Approve
                    </Button>
                  ) : (
                    <span className="text-success">Approved</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default CertificateAdmin;
