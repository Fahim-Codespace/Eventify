import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nickname: '',
    university: '',
    clubName: '',
    bio: '',
    phone: '',
    website: '',
    location: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [adminEvents, setAdminEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          navigate('/login');
          return;
        }

        // Fetch user profile
  const apiUrl = process.env.REACT_APP_API_URL;
  const profileResponse = await fetch(`${apiUrl}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser(profileData.user);
          setFormData(profileData.profile || {
            nickname: userData.name.split(' ')[0],
            university: '',
            clubName: '',
            bio: '',
            phone: '',
            website: '',
            location: ''
          });

          // Load events based on user role
          if (profileData.user.role === 'admin') {
            await loadAdminEvents(token);
          } else {
            await loadUserEvents(token, profileData.user.id);
          }
        } else {
          setUser(userData);
          setFormData({
            nickname: userData.name.split(' ')[0],
            university: '',
            clubName: '',
            bio: '',
            phone: '',
            website: '',
            location: ''
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setUser(userData);
          setFormData({
            nickname: userData.name.split(' ')[0],
            university: '',
            clubName: '',
            bio: '',
            phone: '',
            website: '',
            location: ''
          });
        }
      } finally {
        setLoading(false);
      }
    };

    const loadUserEvents = async (token, userId) => {
      try {
  const response = await fetch(`${apiUrl}/api/users/${userId}/events`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const eventsData = await response.json();
          setUserEvents(eventsData);
        }
      } catch (error) {
        console.error('Error loading user events:', error);
      }
    };

    const loadAdminEvents = async (token) => {
      try {
  const response = await fetch(`${apiUrl}/api/events/my-events`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const eventsData = await response.json();
          setAdminEvents(eventsData);
        }
      } catch (error) {
        console.error('Error loading admin events:', error);
      }
    };

    loadUserProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  try {
    const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;
  const response = await fetch(`${apiUrl}/api/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    console.log('Response status:', response.status);
    
    if (response.ok) {
      const updatedProfile = await response.json();
      console.log('Profile updated successfully:', updatedProfile);
      setFormData(updatedProfile.profile);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } else {
      // Get the error message from the response
      const errorData = await response.json().catch(() => ({}));
      console.error('Server error response:', errorData);
      throw new Error(errorData.error || `Failed to update profile. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error saving profile:', error);
    alert(`Error updating profile: ${error.message}. Please check the console for details.`);
  } finally {
    setLoading(false);
  }
};
  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const getEventRegistrants = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch(`${apiUrl}/api/events/${eventId}/registrants`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const registrants = await response.json();
        alert(`Registrants for this event: ${registrants.length} participants`);
      }
    } catch (error) {
      console.error('Error fetching registrants:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-content">
            <h2>Please log in to view your profile</h2>
            <button className="btn-primary" onClick={() => navigate('/login')}>
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            {getInitials(user.name)}
          </div>
          <h1 style={{color: 'white', marginBottom: '0.5rem'}}>{user.name}</h1>
          <p style={{color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem'}}>{user.email}</p>
          <div className="profile-badge">
            {user.role === 'admin' ? 'Club Administrator' : 'Student'}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="profile-tabs">
          <button 
            className={activeTab === 'profile' ? 'tab-active' : 'tab-inactive'}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button 
            className={activeTab === 'events' ? 'tab-active' : 'tab-inactive'}
            onClick={() => setActiveTab('events')}
          >
            {user.role === 'admin' ? 'My Events' : 'My Participations'}
          </button>
        </div>

        {/* Profile Content */}
        {activeTab === 'profile' ? (
          <div className="profile-content">
            {/* Basic Information Section */}
            <div className="profile-section">
              <h2 className="section-title">Basic Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={user.name}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={user.email}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Nickname</label>
                  <input
                    type="text"
                    name="nickname"
                    className="form-input"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your preferred nickname"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">University</label>
                  <input
                    type="text"
                    name="university"
                    className="form-input"
                    value={formData.university}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Enter your university name"
                  />
                </div>
              </div>
            </div>

            {/* Role-Specific Information */}
            <div className={`profile-section ${user.role === 'admin' ? 'admin-features' : 'student-features'}`}>
              <h2 className="section-title">
                {user.role === 'admin' ? 'Club Administration' : 'Student Information'}
              </h2>
              
              {user.role === 'admin' ? (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Club Name</label>
                    <input
                      type="text"
                      name="clubName"
                      className="form-input"
                      value={formData.clubName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Enter your club name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Club Website</label>
                    <input
                      type="url"
                      name="website"
                      className="form-input"
                      value={formData.website}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="https://yourclub.com"
                    />
                  </div>
                </div>
              ) : (
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Student Bio</label>
                    <textarea
                      name="bio"
                      className="form-input"
                      value={formData.bio}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                      rows="3"
                      style={{resize: 'vertical'}}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Interests</label>
                    <input
                      type="text"
                      className="form-input"
                      disabled={!isEditing}
                      placeholder="Your interests and hobbies"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="profile-section">
              <h2 className="section-title">Contact Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+880 1234567890"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    name="location"
                    className="form-input"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              {isEditing ? (
                <>
                  <button className="btn-primary" onClick={handleSaveProfile}>
                    Save Changes
                  </button>
                  <button className="btn-secondary" onClick={handleCancelEdit}>
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn-primary" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Events Tab Content */
          <div className="profile-content">
            <div className="profile-section">
              <h2 className="section-title">
                {user.role === 'admin' ? 'Events I Created' : 'Events I Participated In'}
              </h2>
              
              {user.role === 'admin' ? (
                <div className="events-grid">
                  {adminEvents.length > 0 ? (
                    adminEvents.map(event => (
                      <div key={event._id} className="event-card">
                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        <div className="event-stats">
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span>👥 {event.registrantsCount || 0} participants</span>
                        </div>
                        <button 
                          className="btn-secondary"
                          onClick={() => getEventRegistrants(event._id)}
                        >
                          View Registrants
                        </button>
                      </div>
                    ))
                  ) : (
                    <p>You haven't created any events yet.</p>
                  )}
                </div>
              ) : (
                <div className="events-grid">
                  {userEvents.length > 0 ? (
                    <>
                      <div className="participation-stats">
                        <h3>Total Events Participated: {userEvents.length}</h3>
                      </div>
                      {userEvents.map(event => (
                        <div key={event._id} className="event-card">
                          <h3>{event.title}</h3>
                          <p>{event.description}</p>
                          <div className="event-stats">
                            <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                            <span>📍 {event.location}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p>You haven't participated in any events yet.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;