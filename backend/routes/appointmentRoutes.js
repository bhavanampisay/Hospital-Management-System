const express = require('express');
const router = express.Router();
const { createAppointment, getAllAppointments } = require('../controllers/appointmentController');

// Routes for appointment
router.post('/create', createAppointment);
router.get('/', getAllAppointments);

module.exports = router;
