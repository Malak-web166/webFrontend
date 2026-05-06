import React, { useState, useEffect } from 'react';
import api from '../api';

const Courses = () => {
const [courses, setCourses] = useState([]);
const [newCourse, setNewCourse] = useState({ title: '', instructorId: '' });

useEffect(() => {
    fetchCourses();
}, []);

const fetchCourses = async () => {
    try {
      const res = await api.get('/courses'); // GET (Fetch data)
    setCourses(res.data);
    } catch (err) {
    console.error("Error fetching courses", err);
    }
};

const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post('/courses', newCourse); // POST (Create data)
    setNewCourse({ title: '', instructorId: '' });
    fetchCourses();
    } catch (err) {
    alert("Error adding course. Make sure the Instructor ID exists.");
    }
};

const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      await api.delete(`/courses/${id}`); // DELETE (Remove data)
    fetchCourses();
    }
};

return (
    <div>
    <h2>Course Management</h2>
<form onSubmit={handleAddCourse} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Course Title" value={newCourse.title}
        onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} required />
        <input type="number" placeholder="Instructor ID" value={newCourse.instructorId}
onChange={(e) => setNewCourse({...newCourse, instructorId: e.target.value})} required />
        <button type="submit">Add Course</button>
</form>

    <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Instructor ID</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {courses.map(c => (
            <tr key={c.id}>
            <td>{c.id}</td>
            <td>{c.title}</td>
            <td>{c.instructorId}</td>
            <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
            </td>
            </tr>
    ))}
        </tbody>
    </table>
    </div>
);
};

export default Courses;