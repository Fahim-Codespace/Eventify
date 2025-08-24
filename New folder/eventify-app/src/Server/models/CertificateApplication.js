const mongoose = require('mongoose');

const certificateApplicationSchema = new mongoose.Schema({
  eventId: {
    type: String,
    required: true
  },
  eventTitle: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  department: String,
  semester: String,
  studentId: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const CertificateApplication = mongoose.model('CertificateApplication', certificateApplicationSchema);

module.exports = CertificateApplication;
