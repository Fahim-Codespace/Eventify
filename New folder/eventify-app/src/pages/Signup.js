import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'; // We'll create this CSS file

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const res = await axios.post('http://localhost:5000/api/register', form);
      setMessage(res.data.message);
      // Redirect to login page after successful registration
      setTimeout(() => {
        navigate('/Login');
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Your Account</h2>
        <p className="register-subtitle">Join us to explore exciting events</p>
        
        <form onSubmit={handleSubmit} className="register-form">
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
            />
          </div>
          
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        {message && (
          <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}
        
        <p className="login-link">
          Already have an account? <Link to="/Login">Log in here</Link>
        </p>
      </div>
    </div>
  );
}