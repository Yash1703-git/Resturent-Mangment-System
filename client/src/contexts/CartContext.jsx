import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);
export default CartContext;

export function CartProvider({ children }) {
  // ✅ INITIALIZE FROM STORAGE (NO EFFECT)
  const [items, setItems] = useState(() => {
    try {
      const stored = sessionStorage.getItem('cart.items');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ SIDE EFFECT ONLY (SYNC TO STORAGE)
  useEffect(() => {
    sessionStorage.setItem('cart.items', JSON.stringify(items));
  }, [items]);

  /* ---------- ACTIONS ---------- */

  const add = useCallback((food, qty = 1) => {
    if (!food?._id) return;

    setItems(prev => {
      const found = prev.find(i => i.foodId === food._id);
      if (found) {
        return prev.map(i =>
          i.foodId === food._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }
      return [
        ...prev,
        {
          foodId: food._id,
          title: food.title,
          price: Number(food.price) || 0,
          qty,
        },
      ];
    });
  }, []);

  const increment = useCallback(id => {
    setItems(prev =>
      prev.map(i =>
        i.foodId === id ? { ...i, qty: i.qty + 1 } : i
      )
    );
  }, []);

  const decrement = useCallback(id => {
    setItems(prev =>
      prev
        .map(i =>
          i.foodId === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  }, []);

  const remove = useCallback(id => {
    setItems(prev => prev.filter(i => i.foodId !== id));
  }, []);

  const clear = useCallback(() => {
    setItems([]);
    sessionStorage.removeItem('cart.items');
  }, []);

  /* ---------- DERIVED VALUES ---------- */

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        increment,
        decrement,
        remove,
        clear,
        totalQty,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
