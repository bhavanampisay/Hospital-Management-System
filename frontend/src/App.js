import React, { useState } from 'react';
import './App.css';
import PatientForm from './components/PatientForm';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import PatientList from './components/PatientList';
import StaffForm from './components/StaffForm';
import BillingForm from './components/BillingForm';
import StaffList from './components/StaffList';
import BillingList from './components/BillingList';

function App() {
  const [showForm, setShowForm] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [refreshStaff, setRefreshStaff] = useState(false);
  const [refreshBilling, setRefreshBilling] = useState(false);

  const renderForm = (formType) => {
    setShowForm(formType);
  };

  const refreshStaffList = () => setRefreshStaff(!refreshStaff);
  const refreshBillingList = () => setRefreshBilling(!refreshBilling);

  return (
    <div className="App">
      <h1>Hospital Management System</h1>

      <div>
        <button onClick={() => renderForm('patient')}>Add Patient</button>
        <button onClick={() => renderForm('appointment')}>Add Appointment</button>
        <button onClick={() => renderForm('staff')}>Add Staff</button>
        <button onClick={() => renderForm('billing')}>Add Billing</button>
        <button onClick={() => renderForm('viewPatients')}>View Patients</button>
        <button onClick={() => renderForm('viewAppointments')}>View Appointments</button>
        <button onClick={() => renderForm('viewStaff')}>View Staff</button>
        <button onClick={() => renderForm('viewBilling')}>View Billing</button>
      </div>

      <div>
        {showForm === 'patient' && <PatientForm />}
        {showForm === 'appointment' && <AppointmentForm patientId={selectedPatient} />}
        
        {showForm === 'staff' && <StaffForm refreshStaffList={refreshStaffList} />}
        {showForm === 'billing' && <BillingForm refreshBillingList={refreshBillingList} />}
        
        {showForm === 'viewPatients' && <PatientList setSelectedPatient={setSelectedPatient} />}
        {showForm === 'viewAppointments' && <AppointmentList />}
        
        {showForm === 'viewStaff' && <StaffList refresh={refreshStaff} />}
        {showForm === 'viewBilling' && <BillingList refresh={refreshBilling} />}
      </div>
    </div>
  );
}

export default App;
