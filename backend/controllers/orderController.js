import Order from "../models/Order.js";

// Place Order
export const placeCashOrder = async (req, res) => {
  try {
    const {
      customerName,
      address,
      phone,
      items,
      totalAmount,
      paymentMethod
    } = req.body;

    const newOrder = new Order({
      customerName,
      address,
      phone,
      items,
      totalAmount,
      paymentMethod,
      paymentStatus: "Pending",
      orderStatus: "Pending"
    });

    await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order placement failed",
      error: error.message
    });
  }
};

// Get All Orders (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message
    });
  }
};

// Update Order Status (Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message
    });
  }
};

// Get User Orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ phone: req.params.phone }).sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message
    });
  }
};