import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudent, updateStudent, deleteStudent } from '../services/api';

export default function StudentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm]       = useState({ name: '', email: '', age: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [error, setError]     = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    getStudent(id)
      .then(res => setForm({ name: res.data.name, email: res.data.email, age: res.data.age }))
      .catch(() => setError('Student not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async e => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      await updateStudent(id, form);
      setSuccess('Updated successfully!');
    } catch {
      setError('Update failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this student?')) return;
    await deleteStudent(id);
    navigate('/students');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <h2 style={{ marginBottom: '1.5rem' }}>Edit Student</h2>
      {error   && <p style={{ color: 'red',   marginBottom: 12 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginBottom: 12 }}>{success}</p>}
      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input name="name"  value={form.name}  onChange={handleChange} placeholder="Full name" required style={input} />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email"      required style={input} />
        <input name="age"   value={form.age}   onChange={handleChange} placeholder="Age" type="number"  style={input} />
        <button type="submit" disabled={saving} style={{ padding: '0.65rem', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>
          {saving ? 'Saving...' : 'Update Student'}
        </button>
      </form>
      <button onClick={handleDelete} style={{ marginTop: 12, width: '100%', padding: '0.65rem', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 500 }}>
        Delete Student
      </button>
    </div>
  );
}

const input = { padding: '0.6rem 0.8rem', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 14 };