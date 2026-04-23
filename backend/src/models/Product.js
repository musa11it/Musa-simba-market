const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: true,
    enum: ['Groceries', 'Electronics', 'Clothing', 'Home', 'Beauty', 'Other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    default: 0
  },
  branch: {
    type: mongoose.Schema.ObjectId,
    ref: 'Branch'
  },
  sku: {
    type: String,
    unique: true,
    sparse: true
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/150'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
