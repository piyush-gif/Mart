import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import Product from "./model/Product.js";

import User from "./model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "./middleware/auth.js";

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
      return res.status(400).json({ message: "Email already in use" });
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
      role: ["user"],
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

app.post("/login", logger, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to save data" });
  }
});

app.post("/logout", (req, res) => {
  res.json({ message: "Logged out" });
});

app.post("/add_to_cart", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { _id: productId, name, price, category, expirationDate } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const cartItem = user.cart.find((item) => item.productId.equals(productId));
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      user.cart.push({
        productId,
        name,
        price,
        category,
        expirationDate,
        quantity: 1,
      });
    }
    await user.save();
    res.json({ message: "Cart updated", cart: user.cart });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to update cart" });
  }
});

app.post("/refresh-token", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired refresh token" });
  }
});

app.get("/get-cart-data", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
});

app.delete("/cart/:id", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== req.params.id
    );
    await user.save();
    res.json({ message: "Item deleted", cart: user.cart });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

app.get("/cart-count", auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    const total = user.cart.reduce((acc, item) => acc + item.quantity, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ error: "failed to fetch cart count" });
  }
});

app.get("/user-data", logger, auth, async (req, res) => {
  try {
    if (!req.user.role || !req.user.role.includes("admin")) {
      return res.status(403).json({ message: "access denied : Admin only" });
    }
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data" });
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
