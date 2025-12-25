const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },

  // category = veg / nonveg
  category: { type: String, required: true },

  // ⭐ NEW FIELD
  type: {
    type: String,
    enum: ['lunch', 'starter', 'drinks', 'snacks'],
    required: false,
  },

  isFeatured: {
    type: Boolean,
    default: false,
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Food', FoodSchema);
