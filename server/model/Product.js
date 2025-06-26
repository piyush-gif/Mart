import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  expirationDate: Date,
  category: String,
  
});

export default mongoose.model('Product', productSchema);
