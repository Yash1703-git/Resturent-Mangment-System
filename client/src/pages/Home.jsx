import { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';
import DishCard from '../Components/DishCard';
import heroBg from './../assets/hero-bg.jpg';
import SplashLoader from '../Components/SplashLoader';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);

        const res = await API.get('/foods', {
          params: { featured: true }
        });

        setFeatured(res.data.items || []);
      } catch (err) {
        console.error('Failed to load featured dishes:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Loading Screen
  if (loading) {
  return <SplashLoader />;
}

  return (
    <div className="p-8">
      {/* Hero Section */}
      <section
        className="p-6 rounded mb-6 bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6 p-6 rounded">
          <div>
            <h1 className="text-3xl font-bold">
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

      {/* Featured Section */}
      <section className="max-w-8xl mx-auto">
        <h2 className="text-xl font-bold mb-3">
          ⭐ Featured Dishes
        </h2>

        {featured.length === 0 ? (
          <p className="text-gray-500">
            No featured dishes available.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {featured
              .filter(food => food.isFeatured)
              .map(food => (
                <DishCard key={food._id} food={food} />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}