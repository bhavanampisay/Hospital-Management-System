import React, { useState } from 'react';
import axios from 'axios';

const PatientForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation for name (only alphabets)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setError('Name should contain only alphabets');
      return;
    }

    // Validation for contact (exactly 10 digits)
    if (!/^\d{10}$/.test(contact)) {
      setError('Contact number should contain exactly 10 digits');
      return;
    }

    if (!name || !age || !contact || !gender) {
      setError('All fields are required!');
      return;
    }
    
    setError('');
    const patientData = { name, age, contact, gender };

    axios.post('http://localhost:5000/add-patient', patientData)
      .then(response => {
        setSuccessMessage('Patient added successfully!');
        setName('');
        setAge('');
        setContact('');
        setGender('');
      })
      .catch(error => {
        setError('Error adding patient');
      });
  };

  return (
    <div className="form-container">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PatientForm;
