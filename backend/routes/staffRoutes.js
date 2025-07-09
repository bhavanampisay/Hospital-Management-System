const express = require('express');
const router = express.Router();
const { addStaff, getAllStaff } = require('../controllers/staffController');

// Routes for staff
router.post('/add', addStaff);
router.get('/', getAllStaff);

module.exports = router;
