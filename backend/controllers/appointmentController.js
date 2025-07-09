const Appointment = require('../models/Appointment');

// Create new appointment
exports.createAppointment = async (req, res) => {
  const { patientId, appointmentDate, doctor } = req.body;

  try {
    const newAppointment = new Appointment({ patientId, appointmentDate, doctor });
    await newAppointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
