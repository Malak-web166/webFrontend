import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to the Student Management System</h1>
      <p>Use the navigation above to manage Students, Courses, and Instructors.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/students">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Manage Students</button>
        </Link>
        <Link to="/courses">
          <button style={{ margin: '10px', padding: '10px 20px' }}>Manage Courses</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;