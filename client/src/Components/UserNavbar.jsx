import { Link } from 'react-router-dom';
import { useContext } from 'react';
// import AuthContext from '../contexts/authContext';
import AuthContext from '../contexts/AuthContext';

export default function UserNavbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="flex gap-4 p-4 border-b">
      <Link to="/">Restaurant</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/my-orders">My Orders</Link>
      <Link to="/cart">Cart</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
