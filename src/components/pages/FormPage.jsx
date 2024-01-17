// FormComponent.jsx
import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Use 'compat' for Firebase version 8 or above
import 'firebase/compat/firestore'; // Use 'compat' for Firebase version 8 or above


const FormPage = () => {
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send data to Firebase
    const db = firebase.firestore();
    await db.collection('jobs').add({
      company,
      location,
      role,
      status,
    });

    // Clear form fields
    setCompany('');
    setLocation('');
    setRole('');
    setStatus('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields for Company, Location, Role, Status */}
      {/* ... (your input fields) */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormPage;
