import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function MyOrders(){
  const [orders, setOrders] = useState([]);
  const fetch = async () => {
    const res = await API.get('/orders/mine');
    setOrders(res.data);
  };
  useEffect(()=>{ fetch(); const id = setInterval(fetch, 10000); return ()=>clearInterval(id); },[]);
  return (
    <div>
      <h2 className="text-xl mb-4">My Orders</h2>
      {orders.map(o => (
        <div key={o._id} className="border p-3 rounded mb-3">
          <div className="flex justify-between">
            <div>Order #{o._id.slice(-6)}</div>
            <div>{new Date(o.placedAt).toLocaleString()}</div>
          </div>
          <div>Total: ₹{o.total}</div>
          <div>Status: <span className={o.status==='delivered'?'text-green-600':'text-orange-500'}>{o.status}</span></div>
        </div>
      ))}
    </div>
  );
}
