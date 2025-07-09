const Patient = require('../models/Patient');  // Assuming you have a Patient model

exports.addPatient = async (req, res) => {
  const { name, age, address } = req.body;

  try {
    const newPatient = new Patient({ name, age, address });
    await newPatient.save();
    res.status(201).json({ message: 'Patient added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding patient', error: error.message });
  }
};
