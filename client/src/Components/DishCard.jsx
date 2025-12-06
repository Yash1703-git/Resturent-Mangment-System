import React, { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export default function DishCard({ food }){
  const { add } = useContext(CartContext);
  return (
    <div className="border rounded p-3 flex flex-col">
      <img src={food.imageUrl || 'https://via.placeholder.com/300x200?text=Food'} alt={food.title} className="h-40 object-cover rounded"/>
      <h3 className="font-semibold mt-2">{food.title}</h3>
      <p className="text-sm text-gray-600">{food.description}</p>
      <div className="mt-auto flex items-center justify-between">
        <div className="font-bold">₹{food.price}</div>
        <button onClick={()=>add(food)} className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
      </div>
    </div>
  );
}
