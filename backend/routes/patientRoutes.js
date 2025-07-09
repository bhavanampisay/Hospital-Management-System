const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/', patientController.addPatient); // This will handle POST requests to '/api/patients'

module.exports = router;
