const express = require('express');
const router = express.Router();
const { createBilling, getAllBilling } = require('../controllers/billingController');

// Routes for billing
router.post('/create', createBilling);
router.get('/', getAllBilling);

module.exports = router;
