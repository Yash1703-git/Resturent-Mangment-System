import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <section className="bg-indigo-50 p-6 rounded mb-6">
        <div className="container mx-auto flex flex-col md:flex-row items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold">Delicious food delivered fast</h1>
            <p className="mt-2">Explore our menu and order your favorite dishes.</p>
            <Link to="/menu" className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded">See Menu</Link>
          </div>
          <img src="https://via.placeholder.com/400x250?text=Food+Hero" alt="hero" className="rounded"/>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-bold mb-4">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Simple static featured placeholders — you can later fetch from /api/foods */}
          <div className="border p-4 rounded">Featured Item</div>
          <div className="border p-4 rounded">Featured Item</div>
          <div className="border p-4 rounded">Featured Item</div>
        </div>
      </section>
    </div>
  );
}
