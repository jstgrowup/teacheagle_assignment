import mongoose from "mongoose";
const inventorySchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please Provide name"],
    unique: true,
  },
  productImage: {
    type: String,
  },
  productDescription: {
    type: String,
    required: [true, "Please Provide password"],
  },
  weight: {
    type: String,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  price: {
    type: Number,
    required: [true, "Please Provide price"],
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  stockQuantity: {
    type: Number,
    required: true,
  },
});
const Inventory =
  mongoose.models.inventory || mongoose.model("inventory", inventorySchema);
export default Inventory;
