import { useEffect, useState } from "react";
import API from "../utils/api";
import "./adminorders.css";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data.orders);
    } catch (error) {
      console.log("Error fetching orders:", error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { orderStatus: status });
      fetchOrders();
    } catch (error) {
      console.log("Error updating status:", error);
    }
  };

  return (
    <div className="admin-orders-container">
      <h1>All Orders</h1>

      <div className="orders-grid">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div className="order-card" key={order._id}>
              <h2>{order.customerName}</h2>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
              <p><strong>Order Status:</strong> {order.orderStatus}</p>

              <div className="order-items">
                <h3>Items:</h3>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <p>
                      {item.name} x {item.quantity} - ₹{item.price}
                    </p>
                  </div>
                ))}
              </div>

              <div className="status-buttons">
                <button onClick={() => updateStatus(order._id, "Preparing")}>
                  Preparing
                </button>
                <button onClick={() => updateStatus(order._id, "Out for Delivery")}>
                  Out for Delivery
                </button>
                <button onClick={() => updateStatus(order._id, "Delivered")}>
                  Delivered
                </button>
                <button onClick={() => updateStatus(order._id, "Cancelled")}>
                  Cancelled
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminOrders;