import mongoose from 'mongoose'
//const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Product name is required'
  },
  description: {
    type: String,
    trim: true,
    required: 'Product description is required'
  },
  price: {
    type: Number,
    required: 'Product price is required'
  },
  quantity: {
    type: Number,
    required: 'Product quantity is required'
  },
  category: {
    type: String,
    trim: true,
    required: 'Product category is required'
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
});

//Validation
UserSchema.path('price').validate(function (v) {
  if (v <= 0) {
    this.invalidate('price', 'Product price must be greater than 0!');
  }
}, null);

UserSchema.path('quantity').validate(function (v) {
  if (v < 0) {
    this.invalidate('quantity', 'Product quantity must be >= 0!');
  }
}, null);

//module.exports = mongoose.model('User', UserSchema);
export default mongoose.model('products', UserSchema);

