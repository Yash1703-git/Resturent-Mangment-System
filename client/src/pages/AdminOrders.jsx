import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminOrders(){
  const [orders, setOrders] = useState([]);
  const fetch = async () => {
    const res = await API.get('/admin/orders');
    setOrders(res.data);
  };
  useEffect(()=>{ fetch(); },[]);
  const markDelivered = async (id) => {
    await API.patch(`/admin/orders/${id}/status`, { status: 'delivered' });
    setOrders(o => o.map(x => x._id===id ? {...x, status:'delivered'} : x));
  };
  return (
    <div>
      <h2 className="text-xl mb-4">Manage Orders</h2>
      <table className="w-full table-auto border">
        <thead><tr><th>User</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id} className="border-t">
              <td>{o.userId?.email || 'unknown'}</td>
              <td>₹{o.total}</td>
              <td>{o.status}</td>
              <td>{o.status === 'pending' && <button onClick={()=>markDelivered(o._id)} className="px-2 py-1 bg-green-600 text-white rounded">Mark Delivered</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
