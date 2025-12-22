import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import AuthContext from '../contexts/authContext';
import AuthContext from '../contexts/AuthContext';

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="flex gap-4 p-4 border-b bg-gray-100">
      <Link to="/admin/add-food">Add Dish</Link>
      <Link to="/admin/orders">Orders</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
