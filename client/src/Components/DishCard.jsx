import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import AuthContext from '../contexts/AuthContext';

export default function DishCard({ food }) {
  const { add } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAdd = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    add(food, 1);
  };

  return (
    <div className="border rounded p-3 flex flex-col">
      <img src={food.imageUrl} className="h-36 object-cover rounded mb-2" />
      <h3 className="font-semibold">{food.title}</h3>
      <p>₹{food.price}</p>

      <button
        onClick={handleAdd}
        className="mt-auto bg-indigo-600 text-white py-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
