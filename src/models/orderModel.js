import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  cartIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "carts",
    },
  ],
  transactionStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  cartTotal: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "Order Placed",
      "Shipped",
      "Out for Delivery",
      "Delivered",
      "Returned",
      "Refunded",
    ],
    default: "Order Placed",
  },
  orderId: {
    type: String,
    required:true
  },
});
const OrderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default OrderModel;
