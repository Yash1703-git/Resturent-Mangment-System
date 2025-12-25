// src/pages/MyOrders.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get('/orders/mine');
        if (!mounted) return;
        setOrders(res.data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message || 'Failed to load orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // initial fetch
    fetchOrders();
    // polling every 10s
    const id = setInterval(fetchOrders, 10000);

    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, []); // no external deps

  return (
    <div className='py-3 px-8'>
      <h2 className="text-xl mb-4">My Orders</h2>

      {loading && <div>Loading orders...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      {orders.length === 0 && !loading && <div>No orders found.</div>}

      {orders.map(o => (
        <div key={o._id} className="border p-3 rounded mb-3">
          <div className="flex justify-between">
            <div>Order #{o._id.slice(-6)}</div>
            <div>{new Date(o.placedAt).toLocaleString()}</div>
          </div>
          <div>Total: ₹{o.total}</div>
          <div>
            Status:{' '}
            <span className={o.status === 'delivered' ? 'text-green-600' : 'text-orange-500'}>
              {o.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
