import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
  productId :{type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true
  },
  name:String,
  description: String,
  price: Number,
  expirationDate: Date,
  category: String,
  quantity: {
    type :Number, 
    default: 1
  }
});

export default mongoose.model('Cart', cartSchema);