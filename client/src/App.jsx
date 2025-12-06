import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import AdminAddFood from './pages/AdminAddFood';
import AdminOrders from './pages/AdminOrders';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';

const Protected = ({ children, adminOnly=false }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" />;
  return children;
};

export default function App(){
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/checkout" element={<Protected><Checkout/></Protected>} />
          <Route path="/my-orders" element={<Protected><MyOrders/></Protected>} />
          <Route path="/admin/add-food" element={<Protected adminOnly={true}><AdminAddFood/></Protected>} />
          <Route path="/admin/orders" element={<Protected adminOnly={true}><AdminOrders/></Protected>} />
        </Routes>
      </main>
    </div>
  );
}
