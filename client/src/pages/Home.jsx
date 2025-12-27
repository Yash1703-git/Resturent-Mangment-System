import { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import DishCard from '../Components/DishCard';
import heroBg from "./../assets/hero-bg.jpg"

export default function Home(){

  const [featured, setFeatured] = useState([]);

  useEffect(() => {
  const fetchFeatured = async () => {
    const res = await API.get('/foods', {
      params: { featured: true }   // ✅ backend filter
    });
    setFeatured(res.data.items || []);
  };
  fetchFeatured();
}, []);

  if (!featured.length) return null;


  return (
    <div className='p-8'> 
     <section
  className="p-6 rounded mb-6 bg-cover bg-center text-white"
  style={{ backgroundImage: `url(${heroBg})` }}
>
  <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 p-6 rounded">
    <div>
      <h1 className="text-3xl font-bold white">
        Delicious food delivered fast
      </h1>
      <p className="mt-2">
        Explore our menu and order your favorite dishes.
      </p>
      <Link
        to="/menu"
        className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        See Menu
      </Link>
    </div>
  </div>
</section>
      <section className=" max-w-8xl mx-auto">
      <h2 className="text-xl font-bold mb-3">⭐ Featured Dishes</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
         {featured
            .filter(food => food.isFeatured === true)   // ⭐ ONLY ADMIN-SELECTED
            .map(food => (
           <DishCard key={food._id} food={food} />
        ))}
      </div>
    </section>
    </div>
  );
}
