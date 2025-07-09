const Staff = require('../models/Staff');

// Add new staff member
exports.addStaff = async (req, res) => {
  const { name, role, contact } = req.body;

  try {
    const newStaff = new Staff({ name, role, contact });
    await newStaff.save();
    res.status(201).json(newStaff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
