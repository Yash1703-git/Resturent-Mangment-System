const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
    title: String,
    price: Number,
    qty: Number
  }],
  subtotal: Number,
  tax: Number,
  deliveryFee: Number,
  total: Number,
  addressSnapshot: Object,
  status: { type: String, enum: ['pending','delivered'], default: 'pending' },
  placedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
