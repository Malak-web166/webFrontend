import React, { useState, useEffect } from 'react';
import api from '../api'; // Ensure this points to your api.js with withCredentials: true

const Students = () => {
const [students, setStudents] = useState([]);
const [name, setName] = useState('');

  // Requirement 6: Load students when the page opens
useEffect(() => {
    fetchStudents();
}, []);

const fetchStudents = async () => {
    try {
    const res = await api.get('/students');
    setStudents(res.data);
    } catch (err) {
    console.error("Could not fetch students", err);
    }
};

const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Requirement 4: POST (create data)
    await api.post('/students', { name: name, courseId: 1 }); 
    
      alert("Student Added Successfully!"); // Confirmation
      setName('');      // Clear the input box
      fetchStudents();  // IMPORTANT: Re-fetch the list so the new name appears!
    } catch (err) {
    alert("Error adding student. Is your Backend running?");
    console.error(err);
    }
};

const handleDelete = async (id) => {
    try {
      await api.delete(`/students/${id}`); // Requirement 4: DELETE
      fetchStudents(); // Refresh the list
    } catch (err) {
    alert("Delete failed.");
    console.error(err);
    }
};

return (
    <div style={{ padding: '20px', color: 'white' }}>
    <h1>Student Management</h1>
    <form onSubmit={handleAdd}>
        <input 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Type name here..." 
        required 
        />
        <button type="submit">Add Student</button>
    </form>

    <ul style={{ marginTop: '20px' }}>
        {students.map(s => (
        <li key={s.id} style={{ marginBottom: '10px' }}>
            {s.name} 
            <button onClick={() => handleDelete(s.id)} style={{ marginLeft: '10px' }}>
            Delete
            </button>
        </li>
        ))}
    </ul>
    </div>
);
};

export default Students;