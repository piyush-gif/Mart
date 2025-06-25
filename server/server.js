import express from 'express';
const app = express();
const PORT = 5000;
app.use(express.json()); 

import Product from './model/Product.js';

app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));