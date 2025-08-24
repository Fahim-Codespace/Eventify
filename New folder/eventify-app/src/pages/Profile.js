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
  const navigate = useNavigate();

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        // Simulate API call to fetch user profile
        const userData = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (!userData || !token) {
          navigate('/login');
          return;
        }

        // In a real app, you would fetch profile data from your API
        const profileResponse = await fetch('http://localhost:5000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (profileResponse.ok) {
          const profileData = await profileResponse.json();
          setUser(profileData.user);
          setFormData(profileData.profile || {
            nickname: userData.name.split(' ')[0], // Default nickname
            university: '',
            clubName: '',
            bio: '',
            phone: '',
            website: '',
            location: ''
          });
        } else {
          // Fallback to basic user data
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
      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setFormData(updatedProfile.profile);
        setIsEditing(false);
        // Show success message
        alert('Profile updated successfully!');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form data and exit edit mode
    setIsEditing(false);
    // Reload original data (in a real app, you'd fetch from server)
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
            <button 
              className="btn-primary"
              onClick={() => navigate('/login')}
            >
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

        {/* Profile Content */}
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
                  placeholder="+1 (555) 123-4567"
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
      </div>
    </div>
  );
};

export default Profile;