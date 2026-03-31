import { useEffect, useState } from "react";
import API from "../utils/api";
import "./myOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const phone = localStorage.getItem("userPhone");

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        if (!phone) {
          setMessage("No phone found. Please place an order first.");
          return;
        }

        const res = await API.get(`/orders/user/${phone}`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.log("Error fetching my orders:", error);
        setMessage("Failed to fetch orders");
      }
    };

    fetchMyOrders();
  }, [phone]);

  return (
    <div className="my-orders-container">
      <h1>My Orders</h1>

      {message ? (
        <p>{message}</p>
      ) : orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div className="my-order-card" key={order._id}>
            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            <p><strong>Payment:</strong> {order.paymentMethod}</p>
            <p><strong>Status:</strong> {order.orderStatus}</p>

            <div className="my-order-items">
              <h3>Items:</h3>
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} x {item.quantity} - ₹{item.price}
                </p>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;