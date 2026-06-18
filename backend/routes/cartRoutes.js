const express = require('express');
const {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', protect, getCart);
router.post('/items', protect, addToCart);
router.put('/items/:productId', protect, updateCartQuantity);
router.delete('/items/:productId', protect, removeFromCart);
router.delete('/', protect, clearCart);

module.exports = router;
