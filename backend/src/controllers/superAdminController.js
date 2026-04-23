const User = require('../models/User');
const Branch = require('../models/Branch');
const Order = require('../models/Order');
const Product = require('../models/Product');

// Get Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalBranches = await Branch.countDocuments();
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();

    // Calculate total revenue
    const revenueData = await Order.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('branch')
      .sort({ createdAt: -1 })
      .limit(10);

    // Branch performance
    const branchPerformance = await Branch.find()
      .select('name location status totalSales employees revenue');

    res.status(200).json({
      success: true,
      stats: {
        totalBranches,
        totalAdmins,
        totalOrders,
        totalProducts,
        totalRevenue
      },
      recentOrders,
      branchPerformance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create Branch
exports.createBranch = async (req, res) => {
  try {
    const { name, location, address, phone, email } = req.body;

    if (!name || !location) {
      return res.status(400).json({
        success: false,
        message: 'Name and location are required'
      });
    }

    const branch = new Branch({
      name,
      location,
      address: address || {},
      phone: phone || '',
      email: email || ''
    });

    await branch.save();

    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Branches
exports.getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find()
      .populate('manager', 'name email');

    res.status(200).json({
      success: true,
      count: branches.length,
      branches
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update Branch
exports.updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, location, address, phone, email, status } = req.body;

    const branch = await Branch.findByIdAndUpdate(
      id,
      { name, location, address, phone, email, status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Branch updated successfully',
      branch
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete Branch
exports.deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await Branch.findByIdAndDelete(id);

    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Delete all admins for this branch
    await User.deleteMany({ branch: id });

    res.status(200).json({
      success: true,
      message: 'Branch deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Create Branch Admin
exports.createBranchAdmin = async (req, res) => {
  try {
    const { name, email, password, branch } = req.body;

    if (!name || !email || !password || !branch) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if branch exists
    const branchExists = await Branch.findById(branch);
    if (!branchExists) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const admin = new User({
      name,
      email,
      password,
      role: 'admin',
      branch
    });

    await admin.save();

    // Update branch manager
    await Branch.findByIdAndUpdate(branch, { manager: admin._id });

    res.status(201).json({
      success: true,
      message: 'Branch admin created successfully',
      admin: admin.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get All Admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: 'admin' })
      .populate('branch', 'name location');

    res.status(200).json({
      success: true,
      count: admins.length,
      admins: admins.map(admin => admin.getPublicProfile())
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Deactivate Admin
exports.deactivateAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Admin not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Admin deactivated successfully',
      admin: admin.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get Analytics
exports.getAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Revenue over time
    const revenueData = await Order.aggregate([
      {
        $match: {
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

    // Top branches by sales
    const topBranches = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: '$branch',
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { totalSales: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: 'branches',
          localField: '_id',
          foreignField: '_id',
          as: 'branch'
        }
      }
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        revenueData,
        topBranches,
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
