const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { exec } = require('child_process');
require('dotenv').config();
// Import the User model
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }
    
    // Validate role
    const validRoles = ['student', 'admin'];
    const userRole = validRoles.includes(role) ? role : 'student';
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = await User.create({ 
      name, 
      email, 
      password: hashedPassword, 
      role: userRole 
    });
    
    res.status(201).json({ 
      message: 'User created successfully', 
      userId: user._id,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ 
      id: user._id, 
      role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Student Portal API</title>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            text-align: center; 
            padding: 50px; 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255, 255, 255, 0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
          }
          h1 { 
            font-size: 2.5em; 
            margin-bottom: 20px;
            color: #fff;
          }
          p { 
            font-size: 1.2em; 
            margin: 15px 0;
            line-height: 1.6;
          }
          .status { 
            background: rgba(255, 255, 255, 0.2);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .endpoints {
            text-align: left;
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .endpoint {
            margin: 10px 0;
            padding: 10px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 5px;
          }
          code {
            background: rgba(255, 255, 255, 0.1);
            padding: 2px 6px;
            border-radius: 3px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎓 Student Portal API</h1>
          <p>Server is running successfully! 🚀</p>
          
          <div class="status">
            <p>✅ <strong>MongoDB Status:</strong> Connected</p>
            <p>🌐 <strong>Port:</strong> ${process.env.PORT || 5000}</p>
            <p>🔄 <strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
          </div>

          <div class="endpoints">
            <h3>📋 Available Endpoints:</h3>
            <div class="endpoint">
              <strong>POST /api/register</strong> - Register a new user
            </div>
            <div class="endpoint">
              <strong>POST /api/login</strong> - User login
            </div>
            <div class="endpoint">
              <strong>GET /</strong> - This page (API status)
            </div>
          </div>

          <p>Use Postman or curl to test the API endpoints</p>
        </div>
      </body>
    </html>
  `);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  // Auto-open browser in development
  if (process.env.NODE_ENV !== 'production') {
    const openCommand = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
    exec(`${openCommand} http://localhost:${PORT}`, (error) => {
      if (error) {
        console.log('Could not auto-open browser. Please manually go to: http://localhost:5000');
      } else {
        console.log('Browser opened automatically!');
      }
    });
  } else {
    console.log(`Server ready at: http://localhost:${PORT}`);
  }
});