import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu,
  X,
  ShoppingCart,
  ListOrdered,
  Utensils,
  LogOut,
  Search
} from 'lucide-react';

import AuthContext from '../contexts/authContext';
import CartContext from '../contexts/cartContext';
import SearchBar from './SearchBar';

export default function UserNavbar() {
  const { logout } = useContext(AuthContext);
  const { totalQty } = useContext(CartContext);
  const [open, setOpen] = useState(false);

  // prevent background scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'auto';
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white border-b shadow-sm relative z-50">
        <div className="max-w-8xl mx-auto px-8 py-3 flex justify-between items-center">

          {/* LOGO */}
          <Link to="/" className="text-xl font-bold whitespace-nowrap">
            Restaurant
          </Link>

          {/* SEARCH (DESKTOP) */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* DESKTOP MENU */}
           <div className="hidden md:flex  gap-6  items-center">
          <Link to="/menu" className='hover:bg-blue-600 hover:font-medium px-3 py-1 rounded'>Menu</Link>
          <Link to="/my-orders" className='hover:bg-blue-600 hover:font-medium px-3 py-1 rounded'>My Orders</Link>
          <Link to="/cart" className='hover:bg-blue-600 hover:font-medium px-3 py-1 rounded'>Cart ({totalQty})</Link>
          <button onClick={logout} className="text-white-600 bg-red-500 px-3 py-1 rounded">
            Logout
          </button>
        </div>
          {/* HAMBURGER */}
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* BACKDROP */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SLIDE-IN DRAWER */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300 ease-in-out
        ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-semibold text-lg">Menu</span>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-4 flex flex-col items-center gap-5">

          {/* SEARCH */}
          <div className="w-full">
            <SearchBar />
          </div>

          {/* LINKS */}
          <NavItem icon={<Utensils />} label="Menu" to="/menu" close={setOpen} />
          <NavItem icon={<ListOrdered />} label="My Orders" to="/my-orders" close={setOpen} />
          <NavItem
            icon={<ShoppingCart />}
            label={`Cart (${totalQty})`}
            to="/cart"
            close={setOpen}
          />

          {/* LOGOUT */}
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="flex items-center gap-2 text-red-600 mt-4"
          >
            <LogOut />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

/* Reusable Nav Item */
function NavItem({ icon, label, to, close }) {
  return (
    <Link
      to={to}
      onClick={() => close(false)}
      className="w-full flex items-center gap-3 px-4 py-2 rounded
      hover:bg-indigo-600 hover:text-white transition"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}
