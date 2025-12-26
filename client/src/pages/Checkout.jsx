// src/pages/Checkout.jsx
import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../contexts/CartContext';
import AuthContext from '../contexts/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, subtotal, clear } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const nav = useNavigate();

  // initialize address from localStorage, fall back to user's profile address or empty object
  const [address, setAddress] = useState(() => {
    try {
      const fromLocal = localStorage.getItem('address');
      if (fromLocal) return JSON.parse(fromLocal);
    } catch {
      // ignore parse errors
    }
    return user?.address || { line1: '', line2: '', city: '', state: '', zip: '', phone: '' };
  });

  const [savingLocal, setSavingLocal] = useState(false);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  // If no address saved in localStorage but user profile has one, apply it asynchronously
  useEffect(() => {
    if (!localStorage.getItem('address') && user?.address) {
      const id = setTimeout(() => {
        setAddress(user.address);
      }, 0);
      return () => clearTimeout(id);
    }
    // no cleanup needed if we don't set
    return undefined;
  }, [user]);

  const saveAddressLocal = () => {
    try {
      setSavingLocal(true);
      localStorage.setItem('address', JSON.stringify(address));
      setError('');
      // small UX confirmation
      setTimeout(() => setSavingLocal(false), 300);
    } catch {
      setSavingLocal(false);
      setError('Failed to save address locally');
    }
  };

  // Optionally save address on user profile (best-effort; server endpoint optional)
  const saveAddressServer = async () => {
    if (!token) return; // only attempt when logged in
    try {
      // If your server implements PUT /auth/me to update profile, this will work.
      await API.put('/auth/me', { address });
    } catch {
      // Ignore server failure; address remains in localStorage
    }
  };

  const validateAddress = (addr) => {
    if (!addr) return false;
    return Boolean(addr.line1 && addr.city && addr.state && addr.zip && addr.phone);
  };

  const placeOrder = async () => {
    setError('');
    if (!items || items.length === 0) {
      setError('Cart is empty.');
      return;
    }
    if (!validateAddress(address)) {
      setError('Please complete the address (line1, city, state, zip, phone).');
      return;
    }

    setPlacing(true);
    try {
      // Send only the necessary shape (server will re-validate/prices)
      await API.post('/orders', { items, address });
      // attempt to persist address to server profile (optional)
      await saveAddressServer();
      clear();
      // keep the saved local address for future checkouts
      localStorage.setItem('address', JSON.stringify(address));
      nav('/my-orders');
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || 'Order failed';
      setError(msg);
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Checkout</h2>

      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Address</h3>

        <label className="block text-sm mb-1">Line 1</label>
        <input
          placeholder="Line 1"
          value={address.line1 || ''}
          onChange={(e) => setAddress(prev => ({ ...prev, line1: e.target.value }))}
          className="w-full p-2 border mb-2 rounded"
        />

        <label className="block text-sm mb-1">Line 2 (optional)</label>
        <input
          placeholder="Line 2"
          value={address.line2 || ''}
          onChange={(e) => setAddress(prev => ({ ...prev, line2: e.target.value }))}
          className="w-full p-2 border mb-2 rounded"
        />

        <label className="block text-sm mb-1">City</label>
        <input
          placeholder="City"
          value={address.city || ''}
          onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
          className="w-full p-2 border mb-2 rounded"
        />

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm mb-1">State</label>
            <input
              placeholder="State"
              value={address.state || ''}
              onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
              className="w-full p-2 border mb-2 rounded"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm mb-1">Zip</label>
            <input
              placeholder="Zip"
              value={address.zip || ''}
              onChange={(e) => setAddress(prev => ({ ...prev, zip: e.target.value }))}
              className="w-full p-2 border mb-2 rounded"
            />
          </div>
        </div>

        <label className="block text-sm mb-1">Phone</label>
        <input
          placeholder="Phone"
          value={address.phone || ''}
          onChange={(e) => setAddress(prev => ({ ...prev, phone: e.target.value }))}
          className="w-full p-2 mt-2 border mb-3 rounded"
        />

        <div className="flex gap-2 mt-2">
          <button
            onClick={saveAddressLocal}
            disabled={savingLocal}
            className="px-3 py-2 bg-gray-200 rounded"
            type="button"
          >
            {savingLocal ? 'Saving...' : 'Save Locally'}
          </button>

          <button
            onClick={placeOrder}
            disabled={placing}
            className="px-3 py-2 bg-indigo-600 text-white rounded"
            type="button"
          >
            {placing ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Order Summary</h3>
        <div className="mt-2">Items: {items?.length || 0}</div>
        <div>Subtotal: ₹{(Number(subtotal) || 0).toFixed(2)}</div>
        <div className="text-sm text-gray-600 mt-2">Tax + Delivery will be calculated on the server.</div>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}
    </div>
  );
}
