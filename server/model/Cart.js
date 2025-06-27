import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
  name:String,
  description: String,
  price: Number,
  expirationDate: Date,
  category: String,
});

export default mongoose.model('Cart', cartSchema);