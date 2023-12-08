import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide name"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please Provide email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide password"],
  },
  userType: {
    type: String,
    enum: ["Customer", "Manager"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isManager: {
    type: Boolean,
    default: false,
  },
  verifyToken: String,
  verifyTokenExpiry: Date,
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
