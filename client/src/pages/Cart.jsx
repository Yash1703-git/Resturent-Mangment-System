import React, { useContext } from 'react';
// import CartContext  from '../contexts/CartContext';
import CartContext from '../contexts/CartContext';
// import QuantityStepper from '../components/QuantityStepper';
import QuantityStepper from '../Components/QuantityStepper';
import { Link, useNavigate } from 'react-router-dom';

export default function Cart(){
  const { items, increment, decrement, remove, subtotal } = useContext(CartContext);
  const nav = useNavigate();
  return (
    <div className='p-8'>
      <h2 className="text-xl mb-4">Cart</h2>
      {items.length===0 ? <div>Cart empty. <Link to="/menu" className="text-indigo-600">Browse menu</Link></div> :
        <div className="grid grid-cols-1 gap-4">
          {items.map(i => (
            <div key={i.foodId} className="flex items-center gap-4 border p-3 rounded">
              <div className="flex-1">
                <div className="font-semibold">{i.title}</div>
                <div>₹{i.price} x {i.qty} = ₹{i.price * i.qty}</div>
              </div>
              <QuantityStepper qty={i.qty} onInc={()=>increment(i.foodId)} onDec={()=>decrement(i.foodId)} />
              <button onClick={()=>remove(i.foodId)} className="text-red-600">Remove</button>
            </div>
          ))}
          <div className="text-right font-bold">Subtotal: ₹{subtotal.toFixed(2)}</div>
          <div className="flex justify-end">
            <button onClick={()=>nav('/checkout')} className="px-4 py-2 bg-indigo-600 text-white rounded">Proceed to Checkout</button>
          </div>
        </div>
      }
    </div>
  );
}
