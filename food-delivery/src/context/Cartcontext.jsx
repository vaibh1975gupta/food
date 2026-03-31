import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const getItemKey = (item) => item._id || item.id;

  const addToCart = (food) => {
    const foodKey = getItemKey(food);

    const existingItem = cart.find(
      (item) => getItemKey(item) === foodKey
    );

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        getItemKey(item) === foodKey
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...food, quantity: 1 }]);
    }
  };

  const increaseQuantity = (itemKey) => {
    const updatedCart = cart.map((item) =>
      getItemKey(item) === itemKey
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (itemKey) => {
    const updatedCart = cart
      .map((item) =>
        getItemKey(item) === itemKey
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeFromCart = (itemKey) => {
    const updatedCart = cart.filter(
      (item) => getItemKey(item) !== itemKey
    );
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;