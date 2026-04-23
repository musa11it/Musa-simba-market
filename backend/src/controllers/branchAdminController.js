const Product = require('../models/Product');
const Order = require('../models/Order');
const Branch = require('../models/Branch');
const User = require('../models/User');

// Get Branch Dashboard Stats
exports.getBranchDashboard = async (req, res) => {
  try {
    const { branch } = req.user;

    if (!branch) {
      return res.status(400).json({
        success: false,
        message: 'Admin must be assigned to a branch'
      });
    }

    // Branch stats
    const branchStats = await Branch.findById(branch._id);
    const totalProducts = await Product.countDocuments({ branch: branch._id });
    const totalOrders = await Order.countDocuments({ branch: branch._id });
    
    // Revenue calculation
    const revenueData = await Order.aggregate([
      { $match: { branch: branch._id, status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Pending orders
    const pendingOrders = await Order.find({ branch: branch._id, status: 'pending' })
      .limit(10)
      .sort({ createdAt: -1 });

    // Low stock products
    const lowStockProducts = await Product.find({
      branch: branch._id,
      quantity: { $lt: 10 }
    }).limit(10);

    res.status(200).json({
      success: true,
      dashboard: {
        branch: {
          name: branchStats?.name,
          location: branchStats?.location,
          status: branchStats?.status
        },
        stats: {
          totalProducts,
          totalOrders,
          totalRevenue,
          pendingOrders: pendingOrders.length,
          lowStockProducts: lowStockProducts.length
        },
        pendingOrders,
        lowStockProducts
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add Product
exports.addProduct = async (req, res) => {
  try {
    const { branch } = req.user;
    const { name, description, category, price, quantity, sku } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, and price are required'
      });
    }

    const product = new Product({
      name,
      description,
      category,
      price,
      quantity: quantity || 0,
      sku: sku || `SKU-${Date.now()}`,
      branch: branch._id
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Branch Products
exports.getBranchProducts = async (req, res) => {
  try {
    const { branch } = req.user;
    const { status = 'active' } = req.query;

    const query = { branch: branch._id };
    if (status) query.status = status;

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch } = req.user;
    const { name, description, category, price, quantity, status } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, branch: branch._id },
      { name, description, category, price, quantity, status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch } = req.user;

    const product = await Product.findOneAndDelete({ _id: id, branch: branch._id });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Branch Orders
exports.getBranchOrders = async (req, res) => {
  try {
    const { branch } = req.user;
    const { status, page = 1, limit = 20 } = req.query;

    const query = { branch: branch._id };
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const orders = await Order.find(query)
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
};

// Update Order Status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { branch } = req.user;
    const { status } = req.body;

    if (!['pending', 'completed', 'cancelled', 'refunded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const order = await Order.findOneAndUpdate(
      { _id: id, branch: branch._id },
      {
        status,
        completedAt: status === 'completed' ? new Date() : null
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order status updated',
      order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Branch Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { branch } = req.user;
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Revenue over time
    const revenueData = await Order.aggregate([
      {
        $match: {
          branch: branch._id,
          createdAt: { $gte: startDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Best selling products
    const topProducts = await Order.aggregate([
      {
        $match: {
          branch: branch._id,
          createdAt: { $gte: startDate },
          status: 'completed'
        }
      },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        revenueData,
        topProducts,
        period: days
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
