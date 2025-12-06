import React, { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { AuthContext } from '../contexts/AuthContext';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Checkout(){
  const { items, subtotal, clear } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [address, setAddress] = useState(() => JSON.parse(localStorage.getItem('address') || JSON.stringify(user?.address || {})));
  const nav = useNavigate();

  const saveAddressLocal = () => { localStorage.setItem('address', JSON.stringify(address)); alert('Saved locally'); };

  const placeOrder = async () => {
    if (!items.length) return alert('Cart empty');
    if (!address || !address.line1) return alert('Please enter address');
    try {
      const res = await API.post('/orders', { items, address });
      clear();
      nav('/my-orders');
    } catch (err) { alert(err.response?.data?.message || 'Order failed'); }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl mb-4">Checkout</h2>
      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold">Address</h3>
        <input placeholder="Line 1" value={address.line1||''} onChange={e=>setAddress({...address,line1:e.target.value})} className="w-full p-2 border mb-2"/>
        <input placeholder="City" value={address.city||''} onChange={e=>setAddress({...address,city:e.target.value})} className="w-full p-2 mb-2 border"/>
        <div className="flex gap-2">
          <input placeholder="State" value={address.state||''} onChange={e=>setAddress({...address,state:e.target.value})} className="w-1/2 p-2 border"/>
          <input placeholder="Zip" value={address.zip||''} onChange={e=>setAddress({...address,zip:e.target.value})} className="w-1/2 p-2 border"/>
        </div>
        <input placeholder="Phone" value={address.phone||''} onChange={e=>setAddress({...address,phone:e.target.value})} className="w-full p-2 mt-2 border"/>
        <div className="flex gap-2 mt-2">
          <button onClick={saveAddressLocal} className="px-3 py-2 bg-gray-200 rounded">Save Locally</button>
          <button onClick={placeOrder} className="px-3 py-2 bg-indigo-600 text-white rounded">Place Order</button>
        </div>
      </div>

      <div className="border p-4 rounded">
        <h3 className="font-semibold">Order Summary</h3>
        <div>Items: {items.length}</div>
        <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
        <div>Tax + Delivery will be calculated on server.</div>
      </div>
    </div>
  );
}
