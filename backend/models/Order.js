import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
        image: String
      }
    ],
    totalAmount: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      default: "COD"
    },
    paymentStatus: {
      type: String,
      default: "Pending"
    },
    orderStatus: {
      type: String,
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);