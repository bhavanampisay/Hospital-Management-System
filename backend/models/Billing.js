const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',  // Ensure this references the Patient model
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    billingDate: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('Billing', billingSchema);
