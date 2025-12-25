import React from 'react';

export default function DishCard({ food, onClick }) {
  return (
    <div
      onClick={onClick}
      className="border rounded-lg p-2 cursor-pointer hover:shadow transition flex flex-col"
    >
      <div className="relative aspect-square rounded overflow-hidden">
        <img
          src={food.imageUrl}
          alt={food.title}
          className="w-full h-full object-cover"
        />

        {/* Veg / Non-Veg badge */}
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-0.5 rounded text-white ${
            food.category === 'veg' ? 'bg-green-600' : 'bg-red-600'
          }`}
        >
          {food.category}
        </span>
      </div>

      <h3 className="text-sm font-semibold mt-2 truncate">{food.title}</h3>

      <div className="flex justify-between items-center mt-1">
        <span className="text-sm font-medium">₹{food.price}</span>

        {/* Rating stars (UI only) */}
        <div className="text-yellow-500 text-xs">
          ★★★★☆
        </div>
      </div>
    </div>
  );
}
