const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Get general analytics
router.get('/', async (req, res) => {
  try {
    const { period = '30', branch } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const query = {
      createdAt: { $gte: startDate },
      status: 'completed'
    };

    if (branch) query.branch = branch;

    // Revenue over time
    const revenueData = await Order.aggregate([
      { $match: query },
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

    // Total stats
    const stats = await Order.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1 },
          avgOrderValue: { $avg: '$totalAmount' }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        revenueData,
        stats: stats[0] || { totalRevenue: 0, totalOrders: 0, avgOrderValue: 0 },
        period: days
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
