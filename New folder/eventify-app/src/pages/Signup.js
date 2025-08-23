import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

export default function Signup() {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'student',
    confirmPassword: '' 
  });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      if (form.password !== form.confirmPassword) {
        setMessage('Passwords do not match');
        setIsLoading(false);
        return;
      }
      
      console.log('Sending registration request:', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      
      const res = await axios.post('http://localhost:5000/api/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role
      });
      
      console.log('Registration response:', res.data);
      setMessage(res.data.message);
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      console.error('Error response:', err.response);
      
      if (err.response) {
        // The server responded with an error status
        setMessage(err.response.data.error || 'Registration failed. Please try again.');
      } else if (err.request) {
        // The request was made but no response was received
        setMessage('Cannot connect to the server. Please make sure your backend is running.');
      } else {
        // Something else happened
        setMessage('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-logo">Eventify</div>
        
        <h2 className="signup-title">Create Your Account</h2>
        <p className="signup-subtitle">Join us to explore exciting events</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <input 
              type="text" 
              name="name" 
              placeholder="Full Name" 
              value={form.name} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="role-selector">
            <button
              type="button"
              className={form.role === 'student' ? 'role-button active-role' : 'role-button'}
              onClick={() => setForm({...form, role: 'student'})}
            >
              Student
            </button>
            <button
              type="button"
              className={form.role === 'admin' ? 'role-button active-role' : 'role-button'}
              onClick={() => setForm({...form, role: 'admin'})}
            >
              Club Admin
            </button>
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              placeholder="Email Address" 
              value={form.email} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              value={form.password} 
              onChange={handleChange} 
              required 
              className="form-input"
              minLength="6"
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="Confirm Password" 
              value={form.confirmPassword} 
              onChange={handleChange} 
              required 
              className="form-input"
            />
          </div>
          
          <button 
            type="submit" 
            className="signup-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        {message && (
          <div className={message.includes('success') ? 'message message-success' : 'message message-error'}>
            {message}
          </div>
        )}
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" className="signup-link">Log in</Link></p>
        </div>
      </div>
    </div>
  );
}