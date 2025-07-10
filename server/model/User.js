import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: String,
    description: String,
    price: Number,
    expirationDate: Date,
    category: String,
    quantity: { type: Number, default: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: { type: [String], default: ["user"] },
  cart: [cartItemSchema],
});

export default mongoose.model("User", userSchema);
