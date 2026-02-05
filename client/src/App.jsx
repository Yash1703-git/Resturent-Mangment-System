import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './contexts/AuthContext';

// pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Signup from './pages/Signup';

// admin pages
import AdminAddFood from './pages/AdminAddFood';
import AdminOrders from './pages/AdminOrders';
import AdminManageDishes from './pages/AdminManageDishes';

// navbars
import UserNavbar from './Components/UserNavbar';
import AdminNavbar from './Components/AdminNavbar';

export default function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // 🔑 hide navbar on auth pages
  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/signup';

  return (
    <>
      {/* NAVBAR */}
      {!hideNavbar && (
        user?.role === 'admin' ? <AdminNavbar /> : <UserNavbar />
      )}

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* USER PROTECTED */}
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
        <Route
          path="/checkout"
          element={user ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-orders"
          element={user ? <MyOrders /> : <Navigate to="/login" />}
        />

        {/* ADMIN PROTECTED */}
        <Route
          path="/admin/add-food"
          element={user?.role === 'admin' ? <AdminAddFood /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/manage-dishes"
          element={user?.role === 'admin' ? <AdminManageDishes /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/orders"
          element={user?.role === 'admin' ? <AdminOrders /> : <Navigate to="/" />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
