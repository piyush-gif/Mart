import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  image: String,
  category: String,
  inStock: Boolean,
});

export default mongoose.model('Product', productSchema);
