import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await api.post('/Account/register', { email: user.email, password: user.password });
      alert("Registration Successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert("Registration failed. Email might already be taken.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" required 
          onChange={(e) => setUser({...user, email: e.target.value})} />
        <input type="password" placeholder="Password" required 
          onChange={(e) => setUser({...user, password: e.target.value})} />
        <input type="password" placeholder="Confirm Password" required 
          onChange={(e) => setUser({...user, confirmPassword: e.target.value})} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;