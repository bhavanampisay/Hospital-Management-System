const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  date: { type: Date, required: true },        // Changed 'appointmentDate' to 'date' for consistency
  time: { type: String, required: true },      // Changed 'appointmentTime' to 'time'
  status: { type: String, required: true },    // Status field
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
