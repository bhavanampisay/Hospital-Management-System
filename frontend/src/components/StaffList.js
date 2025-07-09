import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StaffList = ({ refresh }) => {
  const [staffList, setStaffList] = useState([]);

  const fetchStaffList = () => {
    axios.get('http://localhost:5000/staff')
      .then(response => setStaffList(response.data))
      .catch(error => console.error('Error fetching staff list:', error));
  };

  useEffect(() => {
    fetchStaffList();  // Fetch staff list on mount and on refresh trigger
  }, [refresh]);

  return (
    <div className="list-container">
      <h2>Staff List</h2>
      <table>
        <thead>
          <tr>
            <th>Staff ID</th>
            <th>Name</th>
            <th>Position</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map(staff => (
            <tr key={staff._id}>
              <td>{staff._id}</td>
              <td>{staff.name}</td>
              <td>{staff.position}</td>
              <td>{staff.contact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffList;
