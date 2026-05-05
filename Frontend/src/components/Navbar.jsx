import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', background: '#333', display: 'flex', gap: '15px' }}>
    <Link to="/" style={{ color: 'white' }}>Home</Link>
    <Link to="/students" style={{ color: 'white' }}>Students</Link>
    <Link to="/courses" style={{ color: 'white' }}>Courses</Link>
    <Link to="/login" style={{ color: 'white' }}>Login</Link>
  </nav>
);

export default Navbar;