import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from './contexts/AuthContext';

// user pages
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

  return (
    <>
      {/* NAVBAR */}
      {user?.role === 'admin' && <AdminNavbar />}
      {user && user.role !== 'admin' && <UserNavbar />}

      <Routes>
        {/* ---------- AUTH ---------- */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to="/" />}
        />

        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/menu"
          element={user ? <Menu /> : <Navigate to="/login" />}
        />
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

        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin/add-food"
          element={
            user?.role === 'admin'
              ? <AdminAddFood />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/manage-dishes"
          element={
            user?.role === 'admin'
              ? <AdminManageDishes />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin/orders"
          element={
            user?.role === 'admin'
              ? <AdminOrders />
              : <Navigate to="/login" />
          }
        />

        {/* ---------- FALLBACK ---------- */}
        <Route
          path="*"
          element={<Navigate to={user ? '/' : '/login'} />}
        />
      </Routes>
    </>
  );
}
