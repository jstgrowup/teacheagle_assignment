import mongoose from "mongoose";
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "inventory",
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    versionKey: false,
  }
);
const CartModel = mongoose.models.carts || mongoose.model("carts", cartSchema);
export default CartModel;
