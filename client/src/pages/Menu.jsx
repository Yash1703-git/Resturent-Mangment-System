import React, { useEffect, useMemo, useState, useContext } from 'react';
import API from '../api/api';
import DishCard from '../Components/DishCard';
import CartContext from '../contexts/CartContext';

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // modal state
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);

  // filters
  const [category, setCategory] = useState('all');
  const [price, setPrice] = useState('all');

  const { add } = useContext(CartContext);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await API.get('/foods');
        setFoods(res.data.items || []);
      } catch (err) {
        console.error('Failed to fetch foods', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  /* ================= FILTER ================= */
  const filteredFoods = useMemo(() => {
    return foods.filter(f => {
      if (category !== 'all') {
        // category matches BOTH "category" (veg/nonveg) OR "type" (starter/snacks/drinks)
        if (f.category !== category && f.type !== category) return false;
      }

      if (price === 'under99' && f.price >= 99) return false;
      if (price === 'under299' && f.price >= 299) return false;

      return true;
    });
  }, [foods, category, price]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-xl font-bold mb-4">Menu</h2>

      {/* ================= FILTER BAR ================= */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="all">All</option>
          <option value="starter">Starter</option>
          <option value="snacks">Snacks</option>
          <option value="drinks">Drinks</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <select
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="all">All Prices</option>
          <option value="under99">Under ₹99</option>
          <option value="under299">Under ₹299</option>
        </select>
      </div>

      {/* ================= GRID ================= */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {filteredFoods.map(food => (
            <div
              key={food._id}
              onClick={() => {
                setSelected(food);
                setQty(1);
                setImgIndex(0);
              }}
            >
              <DishCard food={food} />
              
            </div>
          ))}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-lg w-full max-w-md p-4"
          >
            {/* IMAGE */}
            <div className="relative h-56 rounded overflow-hidden mb-3">
              <img
                src={
                  Array.isArray(selected.imageUrl)
                    ? selected.imageUrl[imgIndex]
                    : selected.imageUrl
                }
                className="w-full h-full object-cover"
                alt={selected.title}
              />

              {Array.isArray(selected.imageUrl) &&
                selected.imageUrl.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIndex(i =>
                          i === 0 ? selected.imageUrl.length - 1 : i - 1
                        )
                      }
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 px-2 rounded"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setImgIndex(i =>
                          (i + 1) % selected.imageUrl.length
                        )
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 px-2 rounded"
                    >
                      ›
                    </button>
                  </>
                )}
            </div>

            {/* DETAILS */}
            <h3 className="text-lg font-semibold">{selected.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {selected.description}
            </p>

            <div className="flex justify-between items-center mt-3">
              <span className="font-bold text-lg">
                ₹{selected.price}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded text-white ${
                  selected.category === 'veg'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                }`}
              >
                {selected.category}
              </span>
            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-3 py-1 border rounded"
              >
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 border rounded"
              >
                Close
              </button>
              <button
                onClick={() => {
                  add(selected, qty);
                  setSelected(null);
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
