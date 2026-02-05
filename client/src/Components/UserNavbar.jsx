import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

import CartContext from '../contexts/CartContext';
import SearchBar from './SearchBar';

export default function UserNavbar() {
  const { user, logout } = useContext(AuthContext);
  const { totalQty } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-xl font-bold">
          Restaurant
        </Link>

        {/* SEARCH (DESKTOP) */}
        <div className="hidden md:block flex-1 mx-6">
          <SearchBar />
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/menu">Menu</Link>
          <Link to="/my-orders">My Orders</Link>

          {/* ✅ FIXED CART COUNT */}
          <Link to="/cart">
            Cart ({user ? totalQty : 0})
          </Link>

          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-4 pb-4 flex flex-col items-center gap-3">
          <SearchBar />
          <Link onClick={() => setOpen(false)} to="/menu">Menu</Link>
          <Link onClick={() => setOpen(false)} to="/my-orders">My Orders</Link>
          <Link onClick={() => setOpen(false)} to="/cart">
            Cart ({user ? totalQty : 0})
          </Link>
          {user ? (
            <button onClick={logout} className="text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
