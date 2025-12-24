import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/authContext';

export default function AdminNavbar() {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gray-100 border-b">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center ">
        <span className="font-bold">Admin Panel</span>

        <div className="hidden md:flex gap-6">
          <Link to="/admin/add-food">Add Dish</Link>
          <Link to="/admin/manage-dishes">Manage Dishes</Link>
          <Link to="/admin/orders">Orders</Link>
          <button onClick={logout} className="text-red-600">
            Logout
          </button>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">
          <Link onClick={() => setOpen(false)} to="/admin/add-food">Add Dish</Link>
          <Link onClick={() => setOpen(false)} to="/admin/manage-dishes">Manage Dishes</Link>
          <Link onClick={() => setOpen(false)} to="/admin/orders">Orders</Link>
          <button onClick={logout} className="text-red-600 text-left">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
