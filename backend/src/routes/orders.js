const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Create Order
router.post('/', async (req, res) => {
  try {
    const { branch, items, customerName, customerEmail, customerPhone, paymentMethod } = req.body;

    if (!branch || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Branch and items are required'
      });
    }

    let totalAmount = 0;

    // Calculate total and validate items
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.product} not found`
        });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;

      // Update product quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    const order = new Order({
      branch,
      items,
      totalAmount,
      customerName: customerName || 'Guest',
      customerEmail,
      customerPhone,
      paymentMethod: paymentMethod || 'cash'
    });

    await order.save();

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all orders (public)
router.get('/', async (req, res) => {
  try {
    const { branch, status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (branch) query.branch = branch;
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
      .populate('branch')
      .populate('items.product')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('branch')
      .populate('items.product');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
