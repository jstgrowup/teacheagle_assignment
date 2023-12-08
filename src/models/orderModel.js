import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  transactionStatus: {
    type: Boolean,
    required: true,
    default: false,
  },
  cartTotal: {
    type: Number,
    required: true,
  },
});
const OrderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default OrderModel;
