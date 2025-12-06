import React, { useState } from 'react';
import API from '../api/api';

export default function AdminAddFood(){
  const [form, setForm] = useState({ title:'', description:'', price:'', imageUrl:'', category:'', isAvailable:true });
  const submit = async (e) => {
    e.preventDefault();
    try { await API.post('/admin/foods', {...form, price: Number(form.price)}); alert('Created'); setForm({ title:'', description:'', price:'', imageUrl:'', category:'', isAvailable:true }); } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };
  return (
    <form onSubmit={submit} className="max-w-lg">
      <h2 className="text-xl mb-4">Add Food</h2>
      <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border mb-2"/>
      <textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Desc" className="w-full p-2 border mb-2"/>
      <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="Price" className="w-full p-2 border mb-2"/>
      <input value={form.imageUrl} onChange={e=>setForm({...form,imageUrl:e.target.value})} placeholder="Image URL" className="w-full p-2 border mb-2"/>
      <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="Category" className="w-full p-2 border mb-2"/>
      <div className="flex items-center gap-2 mb-2">
        <label>Available</label>
        <input type="checkbox" checked={form.isAvailable} onChange={e=>setForm({...form,isAvailable:e.target.checked})}/>
      </div>
      <button className="px-3 py-2 bg-indigo-600 text-white rounded">Create</button>
    </form>
  );
}
