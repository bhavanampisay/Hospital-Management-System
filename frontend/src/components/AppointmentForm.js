import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentForm = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Fetch list of patients from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/patients')  // Your backend route to fetch patients
      .then(response => setPatients(response.data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedPatientId || !date || !time || !status) {
      setError('All fields are required!');
      return;
    }

    setError('');

    const appointmentData = {
      patientId: selectedPatientId,
      date,
      time,
      status
    };

    try {
      const response = await axios.post('http://localhost:5000/appointments', appointmentData);  // Backend route for appointments
      console.log(response.data); // Handle success
      alert('Appointment added successfully!');
    } catch (error) {
      console.error('Error adding appointment:', error);
      alert('Failed to add appointment');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Patient Selection */}
        <div>
          <label>Select Patient:</label>
          <select
            value={selectedPatientId}
            onChange={(e) => setSelectedPatientId(e.target.value)}
          >
            <option value="">Select a patient</option>
            {patients.map(patient => (
              <option key={patient._id} value={patient._id}>
                {patient.name} (Age: {patient.age}, Contact: {patient.contact})
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Date */}
        <div>
          <label>Appointment Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        
        {/* Appointment Time */}
        <div>
          <label>Appointment Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* Appointment Status */}
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
