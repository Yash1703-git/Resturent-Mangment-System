import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await API.get('/admin/orders');
        if (!mounted) return;
        setOrders(res.data || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.response?.data?.message || err.message || 'Failed to load orders');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      mounted = false;
    };
  }, []); // no external deps

  const markDelivered = async (id) => {
    try {
      await API.patch(`/admin/orders/${id}/status`, { status: 'delivered' });
      // update local state after success
      setOrders(prev => prev.map(x => x._id === id ? { ...x, status: 'delivered' } : x));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update order');
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Manage Orders</h2>

      {loading && <div>Loading orders...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}

      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="p-2 text-left">User</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 && !loading && (
            <tr><td colSpan="4" className="p-4 text-center">No orders found.</td></tr>
          )}
          {orders.map(o => (
            <tr key={o._id} className="border-t">
              <td className="p-2">{o.userId?.email || 'unknown'}</td>
              <td className="p-2">₹{o.total}</td>
              <td className="p-2">{o.status}</td>
              <td className="p-2">
                {o.status === 'pending' && (
                  <button
                    onClick={() => markDelivered(o._id)}
                    className="px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Mark Delivered
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
