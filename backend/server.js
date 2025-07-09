const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import models
const Appointment = require('./models/Appointment');
const Patient = require('./models/Patient');
const Billing = require('./models/Billing');
const Staff = require('./models/Staff');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/hospital', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));

// API to create an appointment
app.post('/appointments', async (req, res) => {
  const { patientId, date, time, status } = req.body;
  console.log("Received Appointment Data:", req.body);

  if (!patientId || !date || !time || !status) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(400).json({ message: 'Patient not found!' });
    }

    const newAppointment = new Appointment({ patientId, date, time, status });
    await newAppointment.save();
    console.log("Appointment saved:", newAppointment);

    res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ message: 'Error creating appointment', error: error.message });
  }
});

// API to fetch all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find().populate('patientId');
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// API to add a patient
app.post('/add-patient', async (req, res) => {
  const { name, age, disease, contact, gender } = req.body;

  try {
    const patient = new Patient({ name, age, disease, contact, gender });
    await patient.save();
    res.status(200).json({ message: 'Patient added successfully!' });
  } catch (error) {
    console.error('Error adding patient:', error);
    res.status(400).json({ message: 'Failed to add patient', error: error.message });
  }
});

// API to fetch patients list
app.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Failed to fetch patients' });
  }
});

// API to add staff
app.post('/add-staff', async (req, res) => {
  const { name, position, contact } = req.body;

  if (!name || !position || !contact) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const staff = new Staff({ name, position, contact });
    await staff.save();
    res.status(201).json({ message: 'Staff added successfully!', staff });
  } catch (error) {
    console.error('Error adding staff:', error);
    res.status(500).json({ message: 'Failed to add staff', error: error.message });
  }
});

// API to fetch all staff
app.get('/staff', async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    console.error('Error fetching staff:', error);
    res.status(500).json({ message: 'Failed to fetch staff list', error: error.message });
  }
});

// API to add a billing record
app.post('/billing', async (req, res) => {
  const { patientId, amount, billingDate } = req.body;

  try {
    const newBilling = new Billing({ patientId, amount, billingDate });
    await newBilling.save();
    res.status(201).json({ message: 'Billing record created successfully!' });
  } catch (error) {
    console.error('Failed to save billing:', error);
    res.status(500).json({ error: 'Failed to create billing record' });
  }
});

app.get('/billing', async (req, res) => {
  try {
    // Fetch billing records and populate patientId with patient details
    const billingRecords = await Billing.find().populate('patientId');
    
    console.log('Fetched Billing Records:', billingRecords);  // Check the populated data
    res.status(200).json(billingRecords);  // Send back the populated data
  } catch (error) {
    console.error('Error fetching billing records:', error);
    res.status(500).json({ message: 'Failed to fetch billing records', error: error.message });
  }
});


// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
