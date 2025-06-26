import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import Product from './model/Product.js';

const uri = process.env.MONGODB_URI;
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(uri)
  .then(() => console.log('Mongodb connected'))
  .catch(err => console.log('mongodb connection error', err));

app.post('/add_to_cart', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json({ message: 'saved successfully', name: newProduct.name });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'failed to save data' });
  }
});

app.get('/get-data', async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
