import React, { useEffect, useState } from 'react';
import API from '../api/api';
// import DishCard from '../components/DishCard';
import DishCard from '../Components/DishCard';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Menu(){
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const minPrice = params.get('minPrice') || '';
  const maxPrice = params.get('maxPrice') || '';

  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await API.get('/foods', { params: { q, minPrice, maxPrice }});
        setFoods(res.data.items);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    fetchFoods();
  }, [location.search]);

  const applyPrice = (min, max) => {
    const usp = new URLSearchParams(location.search);
    if (min) usp.set('minPrice', min); else usp.delete('minPrice');
    if (max) usp.set('maxPrice', max); else usp.delete('maxPrice');
    navigate(`/menu?${usp.toString()}`);
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input type="number" placeholder="min" defaultValue={minPrice} className="border p-2 rounded"/>
        <input type="number" placeholder="max" defaultValue={maxPrice} className="border p-2 rounded"/>
        <button onClick={() => applyPrice(document.querySelector('input[placeholder="min"]').value, document.querySelector('input[placeholder="max"]').value)} className="px-3 py-2 bg-indigo-600 text-white rounded">Apply</button>
      </div>
      {loading ? <div>Loading...</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foods.length ? foods.map(f => <DishCard key={f._id} food={f} />) : <div>No items found.</div>}
        </div>
      }
    </div>
  );
}
