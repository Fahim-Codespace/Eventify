const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  nickname: String,
  university: String,
  clubName: String,
  bio: String,
  phone: String,
  website: String,
  location: String,
  interests: [String],
  socialLinks: {
    twitter: String,
    linkedin: String,
    github: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);