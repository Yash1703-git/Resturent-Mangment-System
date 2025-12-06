import React, { createContext, useEffect, useState } from 'react';
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('cart') || '[]'));
  useEffect(() => { localStorage.setItem('cart', JSON.stringify(items)); }, [items]);

  const add = (food, qty = 1) => {
    setItems(prev => {
      const found = prev.find(i => i.foodId === food._id);
      if (found) return prev.map(i => i.foodId === food._id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { foodId: food._id, title: food.title, price: food.price, qty }];
    });
  };
  const increment = (id) => setItems(prev => prev.map(i => i.foodId === id ? { ...i, qty: i.qty+1 } : i));
  const decrement = (id) => setItems(prev => {
    return prev.flatMap(i => {
      if (i.foodId !== id) return i;
      const q = i.qty - 1;
      return q > 0 ? [{ ...i, qty: q }] : [];
    });
  });
  const remove = (id) => setItems(prev => prev.filter(i => i.foodId !== id));
  const clear = () => setItems([]);
  const totalQty = items.reduce((s,i)=>s+i.qty,0);
  const subtotal = items.reduce((s,i)=>s + i.price * i.qty, 0);
  return <CartContext.Provider value={{ items, add, increment, decrement, remove, clear, totalQty, subtotal }}>{children}</CartContext.Provider>;
};
