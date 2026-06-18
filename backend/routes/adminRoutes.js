const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getInventory,
  updateInventory,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect, admin);

router.get('/dashboard', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrderById);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/inventory', getInventory);
router.patch('/inventory/:id', updateInventory);

module.exports = router;
