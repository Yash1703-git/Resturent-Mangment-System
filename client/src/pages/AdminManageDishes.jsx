import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function AdminManageDishes() {
  const [foods, setFoods] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadFoods = async () => {
      try {
        const res = await API.get('/foods');
        if (mounted) setFoods(res.data.items || res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadFoods();
    return () => { mounted = false; };
  }, []);

  const updateDish = async () => {
  try {
    await API.put(`/admin/foods/${selected._id}`, {
      title: selected.title,
      description: selected.description,
      price: Number(selected.price),
      imageUrl: selected.imageUrl,
      category: selected.category,
      isFeatured: selected.isFeatured, // ⭐ THIS IS THE FIX
    });

    setFoods(prev =>
      prev.map(f =>
        f._id === selected._id ? { ...selected } : f
      )
    );

    setSelected(null);
  } catch (err) {
    console.error('Failed to update dish', err);
  }
};


  const deleteDish = async (id) => {
    if (!window.confirm('Delete this dish?')) return;
    await API.delete(`/admin/foods/${id}`);
    setFoods(f => f.filter(x => x._id !== id));
  };

  if (loading) return <div className="p-4">Loading dishes...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Dishes</h2>

      {/* DISH GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {foods.map(f => (
          <div
            key={f._id}
            className="border rounded p-3 cursor-pointer hover:shadow"
            onClick={() => setSelected({ ...f })}
          >
            <img
              src={f.imageUrl}
              alt={f.title}
              className="h-40 w-full object-cover rounded mb-2"
            />
            <h3 className="font-semibold">{f.title}</h3>
            <p className="text-sm">₹{f.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteDish(f._id);
              }}
              className="mt-2 text-red-600 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-5 rounded w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Edit Dish</h3>

            <input
              className="w-full border p-2 mb-2"
              value={selected.title}
              onChange={e => setSelected({ ...selected, title: e.target.value })}
              placeholder="Title"
            />

            <input
              className="w-full border p-2 mb-2"
              value={selected.price}
              type="number"
              onChange={e => setSelected({ ...selected, price: e.target.value })}
              placeholder="Price"
            />

            <input
              className="w-full border p-2 mb-2"
              value={selected.imageUrl}
              onChange={e => setSelected({ ...selected, imageUrl: e.target.value })}
              placeholder="Image URL"
            />

            <input
              className="w-full border p-2 mb-2"
              value={selected.category || ''}
              onChange={e => setSelected({ ...selected, category: e.target.value })}
              placeholder="Category"
            />

            <textarea
              className="w-full border p-2 mb-3"
              value={selected.description}
              onChange={e => setSelected({ ...selected, description: e.target.value })}
              placeholder="Description"
            />

            <label className="flex items-center gap-2 mt-2">
             <input type="checkbox" checked={selected.isFeatured} onChange={e =>
                setSelected({ ...selected, isFeatured: e.target.checked })
                }
              />
              Featured Dish
            </label>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateDish}
                className="px-3 py-1 bg-indigo-600 text-white rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
