import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Fetch patients from the backend
    axios.get('http://localhost:5000/patients')
      .then(response => {
        setPatients(response.data);
      })
      .catch(error => {
        console.error('Error fetching patient list:', error);
      });
  }, []);  // Empty dependency array means this runs only once when the component mounts

  return (
    <div>
      <h2>Patient List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Contact</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map(patient => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.contact}</td>
                <td>{patient.gender}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No patients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
