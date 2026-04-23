const express = require('express');
const branchAdminController = require('../controllers/branchAdminController');
const { verifyToken, isAdmin, getCurrentUser } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware
router.use(verifyToken, isAdmin, getCurrentUser);

// Dashboard
router.get('/dashboard', branchAdminController.getBranchDashboard);

// Products
router.post('/products', branchAdminController.addProduct);
router.get('/products', branchAdminController.getBranchProducts);
router.put('/products/:id', branchAdminController.updateProduct);
router.delete('/products/:id', branchAdminController.deleteProduct);

// Orders
router.get('/orders', branchAdminController.getBranchOrders);
router.put('/orders/:id/status', branchAdminController.updateOrderStatus);

// Analytics
router.get('/analytics', branchAdminController.getAnalytics);

module.exports = router;
