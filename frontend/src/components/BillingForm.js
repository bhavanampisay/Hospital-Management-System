import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillingForm = () => {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch patients on component load
  useEffect(() => {
    axios.get('http://localhost:5000/patients')
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!patientId || !amount || !billingDate) {
      setError('All fields are required!');
      return;
    }

    // Clear any previous error
    setError('');

    // Debug the data being sent
    console.log('Form Data:', { patientId, amount, billingDate });

    try {
      const response = await axios.post('http://localhost:5000/billing', {
        patientId,
        amount,
        billingDate
      });

      // Check the response from the server
      console.log('Response from Backend:', response.data);

      // If billing was successful, show success message
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setPatientId('');
        setAmount('');
        setBillingDate('');
      } else {
        setError('Failed to create billing record');
      }
    } catch (error) {
      // Catch any error during API call
      console.error('Error in creating billing record:', error);
      setError('Failed to create billing record');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Billing</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Patient:</label>
          <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Billing Date:</label>
          <input
            type="date"
            value={billingDate}
            onChange={(e) => setBillingDate(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default BillingForm;
