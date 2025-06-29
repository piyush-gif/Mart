import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Product from "./model/Product.js";
import Cart from "./model/Cart.js";
import User from "./model/User.js";
import bcrypt from "bcrypt";

const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(uri)
  .then(() => console.log("Mongodb connected"))
  .catch((err) => console.log("mongodb connection error", err));

// Routes

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toISOString()} ${req.ip}`);
  next();
};

app.post("/register", logger, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Emial already in use" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save data" });
  }
});

app.post("/add_to_cart", async (req, res) => {
  try {
    const { _id, name, price, category, expirationDate } = req.body;
    const existingItem = await Cart.findOne({ productId: _id });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.json({ message: "quantitiy updated", item: existingItem });
    }
    const newCartItem = await Cart.create({
      productId: _id,
      name,
      price,
      category,
      expirationDate,
      quantity: 1,
    });
    res.json({ message: "Added to cart", item: newCartItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save data" });
  }
});

app.get("/get-cart-data", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Falied to fetch data" });
  }
});

app.delete("/cart/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/cart-count", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch cart count" });
  }
});

app.get("/get-data", async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
