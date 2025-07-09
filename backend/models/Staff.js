const mongoose = require('mongoose');

// Staff Schema
const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Staff name is required'],
    trim: true // Ensures no extra spaces around the name
  },
  position: {
    type: String,
    required: [true, 'Staff position is required'],
    trim: true // Ensures no extra spaces around the position
  },
  contact: {
    type: String,
    required: [true, 'Staff contact is required'],
    validate: {
      validator: function(value) {
        // Optional: Check if contact is in a valid phone format (e.g., with numbers)
        return /^[\d\-]+$/.test(value); // Simple regex for phone numbers
      },
      message: 'Invalid phone number format'
    }
  }
}, {
  timestamps: true  // Automatically adds `createdAt` and `updatedAt` fields
});

// Create and export the model
const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
