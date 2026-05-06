import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStudents, deleteStudent } from '../services/api';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');

  const fetchStudents = () => {
    setLoading(true);
    getStudents()
      .then(res => setStudents(res.data))
      .catch(() => setError('Failed to load students.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this student?')) return;
    await deleteStudent(id);
    fetchStudents();
  };

  if (loading) return <p>Loading...</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>All Students</h2>
      {students.length === 0 && <p>No students found. <Link to="/students/new">Add one</Link>.</p>}
      {students.map(s => (
        <div key={s._id || s.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.8rem 1rem', border: '1px solid #e2e8f0', borderRadius: 8, marginBottom: 8 }}>
          <span style={{ fontWeight: 500 }}>{s.name}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link to={`/students/${s._id || s.id}`} style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: 6, textDecoration: 'none', fontSize: 14 }}>View</Link>
            <button onClick={() => handleDelete(s._id || s.id)} style={{ padding: '4px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 14 }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}