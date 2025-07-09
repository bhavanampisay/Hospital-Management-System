import React, { useState } from 'react';
import axios from 'axios';

const StaffForm = ({ refreshStaffList }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !position || !contact) {
      setError('All fields are required!');
      return;
    }
// Validation for name (only alphabets)
if (!/^[a-zA-Z\s]+$/.test(name)) {
  setError('Name should contain only alphabets');
  return;
}

    if (!/^\d{10}$/.test(contact)) {
      setError('Contact number should contain exactly 10 digits');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/add-staff', { name, position, contact });
      setSuccessMessage(response.data.message);
      setName('');
      setPosition('');
      setContact('');
      refreshStaffList();  // Trigger a refresh in the parent component
    } catch (error) {
      console.error('Error adding staff:', error);
      setError('Failed to add staff');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Staff</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Staff Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="text" placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
        <input type="tel" placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default StaffForm;
