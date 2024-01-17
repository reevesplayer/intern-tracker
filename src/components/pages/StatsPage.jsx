

// TableComponent.jsx
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app'; // Use 'compat' for Firebase version 8 or above
import 'firebase/compat/firestore'; // Use 'compat' for Firebase version 8 or above


const Stats = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Retrieve data from Firebase
    const fetchData = async () => {
      const db = firebase.firestore();
      const snapshot = await db.collection('jobs').get();
      const jobData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(jobData);
    };

    fetchData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Location</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((job) => (
          <tr key={job.id}>
            <td>{job.company}</td>
            <td>{job.location}</td>
            <td>{job.role}</td>
            <td>{job.status}</td>
            <td>
              {/* Add icons based on job.status (Check, X, Headset) */}
              {/* ... (your icons) */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Stats;
