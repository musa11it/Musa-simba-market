const express = require('express');
const superAdminController = require('../controllers/superAdminController');
const { verifyToken, isSuperAdmin, getCurrentUser } = require('../middleware/auth');

const router = express.Router();

// Apply auth middleware to all routes
router.use(verifyToken, isSuperAdmin, getCurrentUser);

// Dashboard
router.get('/dashboard', superAdminController.getDashboardStats);

// Branch Management
router.post('/branches', superAdminController.createBranch);
router.get('/branches', superAdminController.getAllBranches);
router.put('/branches/:id', superAdminController.updateBranch);
router.delete('/branches/:id', superAdminController.deleteBranch);

// Admin Management
router.post('/admins', superAdminController.createBranchAdmin);
router.get('/admins', superAdminController.getAllAdmins);
router.put('/admins/:id/deactivate', superAdminController.deactivateAdmin);

// Analytics
router.get('/analytics', superAdminController.getAnalytics);

module.exports = router;
