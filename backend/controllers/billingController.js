const Billing = require('../models/Billing');

// Create billing record
exports.createBilling = async (req, res) => {
  const { patientId, amount, billingDate } = req.body;

  try {
    const newBilling = new Billing({ patientId, amount, billingDate });
    await newBilling.save();
    res.status(201).json(newBilling);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all billing records
exports.getAllBilling = async (req, res) => {
  try {
    const billings = await Billing.find().populate('patientId');
    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
