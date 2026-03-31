import { useContext } from "react";
import { CartContext } from "../context/Cartcontext";
import { Link } from "react-router-dom";
import "./cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
  } = useContext(CartContext);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item, index) => {
            const itemKey = item._id || item.id || index;

            return (
              <div className="cart-item" key={itemKey}>
                <img src={item.image} alt={item.name} />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>Price: ₹{item.price}</p>
                  <p>Subtotal: ₹{item.price * item.quantity}</p>
                </div>

                <div className="cart-quantity">
                  <button onClick={() => decreaseQuantity(itemKey)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(itemKey)}>+</button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(itemKey)}
                >
                  Remove
                </button>
              </div>
            );
          })}

          <h2 className="cart-total">Total: ₹{total}</h2>

          <Link to="/checkout">
            <button className="checkout-btn">Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;