import { createContext, useContext, useMemo, useState, useEffect } from 'react';
import AuthContext from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);

  // 🔑 cart key depends on user
  const cartKey = useMemo(
    () => (user ? `cart_${user._id}` : null),
    [user]
  );

  // ✅ INITIALIZE STATE (NO useEffect)
  const [items, setItems] = useState(() => {
    if (!cartKey) return [];
    try {
      return JSON.parse(localStorage.getItem(cartKey)) || [];
    } catch {
      return [];
    }
  });

  // ✅ RESET CART WHEN USER CHANGES (NO setState-in-effect warning)
  useEffect(() => {
    if (!cartKey) return;
    try {
      const saved = localStorage.getItem(cartKey);
      setItems(saved ? JSON.parse(saved) : []);
    } catch {
      setItems([]);
    }
  }, [cartKey]);

  // ✅ SAVE CART (ALLOWED + SAFE)
  useEffect(() => {
    if (!cartKey) return;
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, cartKey]);

  /* ---------------- CART ACTIONS ---------------- */

  const add = (food, qty = 1) => {
    if (!user) return;

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
          price: food.price,
          qty,
        },
      ];
    });
  };

  const increment = id =>
    setItems(prev =>
      prev.map(i =>
        i.foodId === id ? { ...i, qty: i.qty + 1 } : i
      )
    );

  const decrement = id =>
    setItems(prev =>
      prev
        .map(i =>
          i.foodId === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );

  const remove = id =>
    setItems(prev => prev.filter(i => i.foodId !== id));

  const clear = () => setItems([]);

  const totalQty = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

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

export default CartContext;
