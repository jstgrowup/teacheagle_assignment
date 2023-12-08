import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantity: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    default: 1,
  },
});
const CartModel =
  mongoose.models.cart || mongoose.model("cart", cartSchema);
export default CartModel;
