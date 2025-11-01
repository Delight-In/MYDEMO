import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
import authRoutes from './routes/auth.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Loaded' : '❌ Not loaded');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Loaded' : '❌ Not loaded');
console.log('PORT:', PORT);

// CORS Configuration - Allow frontend on port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware - Remove duplicate cors and body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// In-memory storage (replace with database in production)
let users = [];
let profiles = [];

// Routes

// Get all users (for testing)
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Get user by ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

// Create new user
app.post('/api/users', (req, res) => {
  const { name, email, phone, location, headline } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
    phone: phone || '',
    location: location || '',
    headline: headline || '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Get user profile
app.get('/api/profiles/:userId', (req, res) => {
  const profile = profiles.find(p => p.userId === req.params.userId);
  if (!profile) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  res.json(profile);
});

// Create or update user profile
app.post('/api/profiles', (req, res) => {
  const {
    userId,
    name,
    email,
    phone,
    location,
    headline,
    education,
    experience,
    skills,
    interests,
    achievements
  } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  // Check if user exists
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Check if profile already exists
  const existingProfileIndex = profiles.findIndex(p => p.userId === userId);
  
  const profileData = {
    userId,
    name: name || user.name,
    email: email || user.email,
    phone: phone || user.phone,
    location: location || user.location,
    headline: headline || user.headline,
    education: education || [],
    experience: experience || [],
    skills: skills || [],
    interests: interests || [],
    achievements: achievements || '',
    updatedAt: new Date().toISOString()
  };

  if (existingProfileIndex !== -1) {
    // Update existing profile
    profiles[existingProfileIndex] = {
      ...profiles[existingProfileIndex],
      ...profileData
    };
    res.json(profiles[existingProfileIndex]);
  } else {
    // Create new profile
    const newProfile = {
      id: uuidv4(),
      ...profileData,
      createdAt: new Date().toISOString()
    };
    profiles.push(newProfile);
    res.status(201).json(newProfile);
  }
});

// Delete user profile
app.delete('/api/profiles/:userId', (req, res) => {
  const profileIndex = profiles.findIndex(p => p.userId === req.params.userId);
  if (profileIndex === -1) {
    return res.status(404).json({ error: 'Profile not found' });
  }
  
  profiles.splice(profileIndex, 1);
  res.json({ message: 'Profile deleted successfully' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ✅ Mount the routes properly
app.use('/api', authRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});