import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/Cartcontext";
import API from "../utils/api";
import "./checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "Cash on Delivery"
  });

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCashOnDelivery = async () => {
    try {
      const res = await API.post("/orders/place-order", {
        customerName: formData.name,
        address: formData.address,
        phone: formData.phone,
        items: cart,
        totalAmount: total,
        paymentMethod: "Cash on Delivery"
      });

      if (res.data.success) {
        localStorage.setItem("userPhone", formData.phone);
        clearCart();
        alert("Order placed successfully with Cash on Delivery!");
        navigate("/my-orders");
      } else {
        alert("Failed to place cash order");
      }
    } catch (error) {
      console.error("COD order error:", error);
      alert("Failed to place cash order");
    }
  };

  const handleOnlinePayment = async () => {
    try {
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded");
        return;
      }

      if (!import.meta.env.VITE_RAZORPAY_KEY_ID) {
        alert("Razorpay Key ID missing");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      setLoading(true);

      const { data } = await API.post("/payment/create-order", {
        amount: total
      });

      if (!data.success || !data.order) {
        alert("Order creation failed");
        return;
      }

      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Foodie",
        description: "Food Order Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await API.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              customerName: formData.name,
              address: formData.address,
              phone: formData.phone,
              items: cart,
              totalAmount: total,
              paymentMethod: formData.payment
            });

            if (verifyRes.data.success) {
              localStorage.setItem("userPhone", formData.phone);
              clearCart();
              alert("Payment Successful and Verified ✅");
              navigate("/my-orders");
            } else {
              alert("Payment verification failed ❌");
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("Payment verification error");
          }
        },
        prefill: {
          name: formData.name,
          contact: formData.phone
        },
        notes: {
          address: formData.address
        },
        theme: {
          color: "#f59e0b"
        },
        modal: {
          ondismiss: function () {
            console.log("Payment popup closed");
          }
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert("Payment failed ❌");
      });

      razorpay.open();
    } catch (error) {
      console.error("Payment start error:", error);
      alert("Unable to start payment");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.payment === "Cash on Delivery") {
      await handleCashOnDelivery();
    } else {
      await handleOnlinePayment();
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-form-section">
        <h1>Checkout</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <select
            name="payment"
            value={formData.payment}
            onChange={handleChange}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Card</option>
          </select>

          <button type="submit" disabled={loading}>
            {loading
              ? "Processing..."
              : formData.payment === "Cash on Delivery"
              ? "Place Order"
              : `Pay ₹${total}`}
          </button>
        </form>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.map((item, index) => (
            <div key={item.id || item._id || index} className="summary-item">
              <p>{item.name} x {item.quantity}</p>
              <p>₹{item.price * item.quantity}</p>
            </div>
          ))
        )}

        <h3>Total: ₹{total}</h3>
      </div>
    </div>
  );
}

export default Checkout;