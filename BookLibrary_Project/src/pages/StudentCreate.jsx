import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createStudent } from '../services/api';

export default function StudentCreate() {
  const [form, setForm]       = useState({ name: '', email: '', age: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');
    try {
      await createStudent(form);
      setSuccess('Student created successfully!');
      setTimeout(() => navigate('/students'), 1000);
    } catch {
      setError('Failed to create student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Add New Student</h2>
      {error   && <p style={{ color: 'red',   marginBottom: 12 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: 12 }}>{success}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name"  value={form.name}  onChange={handleChange} placeholder="Full name"  required style={input} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email"       required style={input} />
        <input name="age"   value={form.age}   onChange={handleChange} placeholder="Age" type="number" style={input} />
        <button type="submit" disabled={loading} style={{ padding: '0.65rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>
          {loading ? 'Saving...' : 'Create Student'}
        </button>
      </form>
    </div>
  );
}

const input = { padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14 };