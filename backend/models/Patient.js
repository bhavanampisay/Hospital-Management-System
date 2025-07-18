const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  disease: { type: String },
  contact: { type: String, required: true },
  gender: { type: String, required: true }  // Ensure this field is included
});

module.exports = mongoose.model('Patient', patientSchema);
