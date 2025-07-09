import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/appointments')  // Your backend route for fetching appointments
      .then(response => setAppointments(response.data))
      .catch(error => console.error('Error fetching appointments list:', error));
  }, []);

  return (
    <div className="list-container">
      <h2>Appointment List</h2>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment._id}>
              <td>{appointment._id}</td>
              <td>{appointment.patientId ? appointment.patientId.name : 'N/A'}</td>  {/* Access patient name from patientId */}
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
