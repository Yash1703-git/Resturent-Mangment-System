import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminAddFood() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
  title: '',
  description: '',
  price: '',
  imageUrl: '',
  category: 'veg',
  type: '', 
  isFeatured: false,
});

  // ✅ fetch foods INSIDE useEffect (lint-safe)
  useEffect(() => {
    let isMounted = true;

    const loadFoods = async () => {
      try {
        const res = await API.get('/foods');
        if (isMounted) {
          setFoods(res.data.items || res.data);
        }
      } catch (err) {
        console.error('Failed to fetch foods', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadFoods();

    return () => {
      isMounted = false;
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/admin/foods', {
        ...form,
        price: Number(form.price),
      });

      setForm({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        category: '',
        type: '',
      });

      // reload foods after add
      const res = await API.get('/foods');
      setFoods(res.data.items || res.data);
    } catch (err) {
      console.error('Failed to add food', err);
    }
  };

  const remove = async (id) => {
    try {
      await API.delete(`/admin/foods/${id}`);
      setFoods(prev => prev.filter(f => f._id !== id));
    } catch (err) {
      console.error('Failed to delete food', err);
    }
  };

  if (loading) {
    return <div className="p-4">Loading dishes...</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Dish</h2>

      <form onSubmit={submit} className="grid gap-2 max-w-md mb-6">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Price"
          type="number"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={e => setForm({ ...form, imageUrl: e.target.value })}
          className="border p-2"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
          className="border p-2"
        />
        <select value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border p-2 rounded">
          <option value="lunch">Lunch</option>
          <option value="starter">Starter</option>
          <option value="drinks">Drinks</option>
          <option value="snacks">Snacks</option>
        </select>

        <button className="bg-indigo-600 text-white py-2 rounded">
          Add Dish
        </button>
      </form>

      <h3 className="font-semibold mb-2">All Dishes</h3>

      {foods.length === 0 && <div>No dishes available.</div>}

      {foods.map(f => (
        <div key={f._id} className="flex justify-between border p-2 mb-2">
          <div>
            {f.title} – ₹{f.price}
          </div>
          <button
            onClick={() => remove(f._id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
