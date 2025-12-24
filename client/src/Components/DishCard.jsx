import { useContext } from 'react';
import CartContext from '../contexts/cartContext';

export default function DishCard({ food }) {
  const { add } = useContext(CartContext);

  return (
    <div className="border rounded-lg shadow-sm p-3 flex flex-col w-full max-w-xs gap-2">

     {/* FEATURED BADGE */}
      {food.isFeatured && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-xs font-semibold px-2 py-0.5 rounded">
          ⭐ Featured
        </span>
      )}

      {/* IMAGE – SQUARE */}
      <div className="w-full aspect-square overflow-hidden rounded ">
        <img
          src={food.imageUrl}
          alt={food.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <h3 className="font-semibold text-sm mt-2 truncate">
        {food.title}
      </h3>

      <p className="text-sm font-medium text-gray-600">
        ₹{food.price}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => add(food)}
        className="mt-auto bg-indigo-600 text-white text-sm py-1.5 rounded hover:bg-indigo-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
