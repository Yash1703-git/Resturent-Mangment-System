import React, { useEffect, useMemo, useState } from 'react';
import API from '../api/api';
import DishCard from '../Components/DishCard';
import { useLocation } from 'react-router-dom';

export default function Menu() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // mobile-only filters
  const [mobileCategory, setMobileCategory] = useState('all');
  const [mobilePrice, setMobilePrice] = useState('all');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';

  // fetch once (or on search)
  useEffect(() => {
    const fetchFoods = async () => {
      setLoading(true);
      try {
        const res = await API.get('/foods', { params: { q } });
        setFoods(res.data.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, [q]);

  /* =======================
     DESKTOP SECTIONS
     ======================= */

  const vegFoods = useMemo(
    () => foods.filter(f => f.category === 'veg'),
    [foods]
  );

  const nonVegFoods = useMemo(
    () => foods.filter(f => f.category === 'nonveg'),
    [foods]
  );

  const under99Foods = useMemo(
    () => foods.filter(f => f.price < 99),
    [foods]
  );

  const under299Foods = useMemo(
    () => foods.filter(f => f.price > 199),
    [foods]
  );

  /* =======================
     MOBILE FILTER RESULT
     ======================= */

  const mobileFilteredFoods = useMemo(() => {
    return foods.filter(food => {
      if (mobileCategory !== 'all' && food.category !== mobileCategory) {
        return false;
      }
      if (mobilePrice === 'under99' && food.price >= 99) return false;
      if (mobilePrice === 'above99' && food.price < 99) return false;
      return true;
    });
  }, [foods, mobileCategory, mobilePrice]);

  return (
    <div className="p-4 md:p-8">

      <h2 className="text-xl font-bold mb-4">Menu</h2>

      {/* ================= MOBILE FILTER BAR ================= */}
      <div className="md:hidden flex gap-2 mb-4">
        <select
          value={mobileCategory}
          onChange={e => setMobileCategory(e.target.value)}
          className="border p-2 rounded w-1/2"
        >
          <option value="all">All</option>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <select
          value={mobilePrice}
          onChange={e => setMobilePrice(e.target.value)}
          className="border p-2 rounded w-1/2"
        >
          <option value="all">All Prices</option>
          <option value="under99">Under ₹99</option>
          <option value="above99">Above ₹99</option>
        </select>
      </div>

      {/* ================= MOBILE RESULT ================= */}
      <div className="md:hidden">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {mobileFilteredFoods.map(food => (
              <DishCard key={food._id} food={food} />
            ))}
          </div>
        )}
      </div>

      {/* ================= DESKTOP / TABLET SECTIONS ================= */}
      <div className="hidden md:block space-y-10">

        {/* VEG SECTION */}
        {vegFoods.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-3">🥗 Veg</h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
              {vegFoods.map(food => (
                <DishCard key={food._id} food={food} />
              ))}
            </div>
          </section>
        )}

        {/* NON-VEG SECTION */}
        {nonVegFoods.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-3">🍗 Non-Veg</h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
              {nonVegFoods.map(food => (
                <DishCard key={food._id} food={food} />
              ))}
            </div>
          </section>
        )}

        {/* UNDER 99 SECTION */}
        {under99Foods.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-3">🔥 Under ₹99</h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
              {under99Foods.map(food => (
                <DishCard key={food._id} food={food} />
              ))}
            </div>
          </section>
        )}

        {/*UNDER 299 SECTION */}
        {under299Foods.length > 0 && (
          <section>
            <h3 className="text-lg font-semibold mb-3">🔥 Under ₹299</h3>
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
              {under299Foods.map(food => (
                <DishCard key={food._id} food={food} />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
