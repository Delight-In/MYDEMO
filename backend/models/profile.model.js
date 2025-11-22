import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  description: String,
});

const experienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  from: Date,
  to: Date,
  description: String,
  current: { type: Boolean, default: false },
});

const profileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  location: String,
  headline: String,
  education: [educationSchema],
  experience: [experienceSchema],
  skills: [String],
  interests: [String],
  achievements: String,
}, {
  timestamps: true, // adds createdAt and updatedAt automatically
});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
