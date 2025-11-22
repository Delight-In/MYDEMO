import express from 'express';
import Profile from '../models/profile.model.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get user profile by userId
router.get('/profiles/:userId', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create or update user profile
router.post('/profiles', async (req, res) => {
  try {
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

    console.log('Received profile data:', { userId, name, email });

    // Validate required fields
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Transform and validate data
    const profileData = {
      userId: new mongoose.Types.ObjectId(userId),
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      location: location?.trim() || '',
      headline: headline?.trim() || '',
      education: (education || []).map(edu => ({
        school: edu.school?.trim() || '',
        degree: edu.degree?.trim() || '',
        fieldOfStudy: edu.fieldOfStudy?.trim() || '',
        startDate: edu.startDate || null,
        endDate: edu.endDate || null,
        description: edu.description?.trim() || ''
      })),
      experience: (experience || []).map(exp => ({
        title: exp.title?.trim() || '',
        company: exp.company?.trim() || '',
        location: exp.location?.trim() || '',
        from: exp.from || null,
        to: exp.to || null,
        description: exp.description?.trim() || '',
        current: exp.current || false
      })),
      skills: skills || [],
      interests: interests || [],
      achievements: achievements?.trim() || ''
    };

    console.log('Upserting profile for user:', userId);

    // Upsert profile
    const profile = await Profile.findOneAndUpdate(
      { userId: profileData.userId },
      { $set: profileData },
      { 
        new: true, 
        upsert: true, 
        setDefaultsOnInsert: true,
        runValidators: true 
      }
    );

    console.log('Profile saved successfully:', profile._id);

    res.json({
      success: true,
      profile: profile
    });

  } catch (error) {
    console.error('Error in profile creation:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: Object.values(error.errors).map(e => e.message) 
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Delete user profile by userId
router.delete('/profiles/:userId', async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({ userId: req.params.userId });
    if (!deletedProfile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
