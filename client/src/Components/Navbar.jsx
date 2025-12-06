import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import { ShoppingCart, LogIn, User, PlusCircle } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar(){
  const { totalQty } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto flex items-center gap-4 p-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-xl font-bold">Restaurant</Link>
        </div>
        <div className="flex-1">
          <SearchBar />
        </div>
        <div className="flex items-center gap-3">
          <Link to="/menu" className="hidden sm:inline">Menu</Link>
          <Link to="/my-orders" className="hidden sm:inline">My Orders</Link>
          <div className="relative">
            <Link to="/cart" className="flex items-center gap-2">
              <ShoppingCart size={18}/>
              { totalQty > 0 && <span className="badge absolute -top-2 -right-3">{totalQty}</span> }
            </Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline">{user.name}</span>
              { user.role === 'admin' && <Link to="/admin/add-food" className="hidden sm:inline"><PlusCircle size={16}/></Link> }
              <button onClick={() => { logout(); nav('/'); }} className="text-sm">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="flex items-center gap-1"><LogIn size={16}/>Login</Link>
              <Link to="/signup" className="flex items-center gap-1"><User size={16}/>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
