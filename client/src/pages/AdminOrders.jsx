import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        const res = await API.get('/admin/orders');
        if (isMounted) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Failed to fetch orders', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const markDelivered = async (id) => {
    try {
      await API.patch(`/admin/orders/${id}/status`, { status: 'delivered' });
      setOrders(prev =>
        prev.map(o =>
          o._id === id ? { ...o, status: 'delivered' } : o
        )
      );
    } catch (err) {
      console.error('Failed to update order', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading orders...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Orders</h2>

      {orders.length === 0 && <div>No orders found.</div>}

      {orders.map(o => (
        <div key={o._id} className="border p-3 mb-3 rounded">
          <div><b>User:</b> {o.userId?.email || 'N/A'}</div>
          <div><b>Total:</b> ₹{o.total}</div>
          <div>
            <b>Status:</b>{' '}
            <span className={o.status === 'delivered' ? 'text-green-600' : 'text-orange-500'}>
              {o.status}
            </span>
          </div>

          {o.status === 'pending' && (
            <button
              onClick={() => markDelivered(o._id)}
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
            >
              Mark Delivered
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
