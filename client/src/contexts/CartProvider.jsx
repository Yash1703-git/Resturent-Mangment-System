import React, { useEffect, useState, useCallback } from 'react';
import CartContext from './cartContext';

export default function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const add = useCallback((food, qty = 1) => {
    if (!food?._id) return;
    setItems(prev => {
      const found = prev.find(i => i.foodId === food._id);
      if (found) return prev.map(i => i.foodId === food._id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { foodId: food._id, title: food.title, price: food.price, qty }];
    });
  }, []);

  const increment = useCallback(id => {
    setItems(prev => prev.map(i => i.foodId === id ? { ...i, qty: i.qty + 1 } : i));
  }, []);

  const decrement = useCallback(id => {
    setItems(prev =>
      prev
        .map(i => i.foodId === id ? { ...i, qty: i.qty - 1 } : i)
        .filter(i => i.qty > 0)
    );
  }, []);

  const remove = useCallback(id => setItems(prev => prev.filter(i => i.foodId !== id)), []);
  const clear = useCallback(() => setItems([]), []);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, add, increment, decrement, remove, clear, totalQty, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}
