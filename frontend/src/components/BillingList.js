import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BillingList = () => {
  const [billingRecords, setBillingRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch billing records
    axios.get('http://localhost:5000/billing')
      .then(response => {
        console.log('Billing records:', response.data);  // Log the response to debug
        setBillingRecords(response.data);  // Set the state with the fetched data
      })
      .catch(error => {
        console.error('Error fetching billing records:', error);  // Log the error
        setError('Failed to fetch billing records');  // Show error message
      });
  }, []);

  return (
    <div className="billing-list-container">
      <h2>Billing Records</h2>
      {error && <p className="error-message">{error}</p>}
      {billingRecords.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Amount</th>
              <th>Billing Date</th>
            </tr>
          </thead>
          <tbody>
            {billingRecords.map(record => (
              <tr key={record._id}>
                <td>{record.patientId?.name || "Unknown"}</td>  {/* Access the patient name here */}
                <td>{record.amount}</td>
                <td>{new Date(record.billingDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No billing records found.</p>
      )}
    </div>
  );
};

export default BillingList;
