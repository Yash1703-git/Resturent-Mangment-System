import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Import } from 'lucide-react';
import AuthContext from './contexts/AuthContext';

// user pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Signup from './pages/Signup';

// admin pages (EXISTING FILES)
import AdminAddFood from './pages/AdminAddFood';
import AdminOrders from './pages/AdminOrders';
import AdminManageDishes from './pages/AdminManageDishes';


// navbars
// import UserNavbar from './components/UserNavbar';
import UserNavbar from './Components/UserNavbar';
import AdminNavbar from './Components/AdminNavbar';


export default function App() {
  const { user } = useContext(AuthContext);

  // NOT LOGGED IN → only auth pages
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // ADMIN
  if (user.role === 'admin') {
    return (
      <>
        <AdminNavbar />
        <Routes>
          <Route path="/admin/manage-dishes" element={<AdminManageDishes />} />
          <Route path="/admin/add-food" element={<AdminAddFood />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="*" element={<Navigate to="/admin/add-food" />} />
        </Routes>
      </>
    );
  }

  // USER
  return (
    <>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}
