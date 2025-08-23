// src/pages/Login.js
import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS file

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', form);
      setMessage(`Welcome ${res.data.user.name}!`);
      setIsSuccess(true);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      setMessage(err.response.data.error || 'Login failed.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      {message && <p className={isSuccess ? 'message-success' : 'message-error'}>{message}</p>}
    </div>
  );
}