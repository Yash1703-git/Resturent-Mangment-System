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


function App() {
  const { user} = useContext(AuthContext);

  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={<Login />} />
      <Route path="/menu" element={<Menu />} />

      {/* ADMIN ROUTES (ALWAYS DECLARED) */}
      <Route
        path="/admin/add-dish"
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

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/menu" />} />
    </Routes>
  );
}

export default App;
