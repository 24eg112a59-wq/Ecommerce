const mongoose = require('mongoose');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const formatProduct = (product) => {
  const plainProduct = product.toObject ? product.toObject() : product;
  const discount = Number(plainProduct.discount || 0);
  const price = Number(plainProduct.price || 0);
  const discountedPrice = Number((price - (price * discount) / 100).toFixed(2));

  return {
    ...plainProduct,
    discountedPrice,
  };
};

const formatOrder = (order) => {
  const plainOrder = order.toObject ? order.toObject() : order;

  return {
    ...plainOrder,
    totalPrice: Number(plainOrder.totalPrice || 0).toFixed(2),
  };
};

const getDashboardStats = async (req, res) => {
  try {
    const [userCount, productCount, orderCount, orderRevenue, lowStockCount] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { status: { $ne: 'Cancelled' } } },
        { $group: { _id: null, revenue: { $sum: '$totalPrice' } } },
      ]),
      Product.countDocuments({ stock: { $lte: 5 } }),
    ]);

    const revenue = orderRevenue.length > 0 ? orderRevenue[0].revenue : 0;

    return res.status(200).json({
      success: true,
      stats: {
        users: userCount,
        products: productCount,
        orders: orderCount,
        revenue: Number(revenue.toFixed(2)),
        lowStockProducts: lowStockCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to load dashboard stats',
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email role').sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders: orders.map(formatOrder),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order id',
      });
    }

    const order = await Order.findById(id).populate('userId', 'name email role');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    return res.status(200).json({
      success: true,
      order: formatOrder(order),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order id',
      });
    }

    const allowedStatuses = ['Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid order status',
      });
    }

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order: formatOrder(order),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update order status',
      error: error.message,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const products = await Product.find().sort({ stock: 1, updatedAt: -1 });
    const inventory = products.map(formatProduct);
    const lowStockProducts = inventory.filter((product) => product.stock <= 5);

    return res.status(200).json({
      success: true,
      count: inventory.length,
      lowStockCount: lowStockProducts.length,
      inventory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inventory',
      error: error.message,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock, discount } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid product id',
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    if (stock !== undefined) {
      const numericStock = Number(stock);
      if (!Number.isInteger(numericStock) || numericStock < 0) {
        return res.status(400).json({
          success: false,
          message: 'Stock must be a non-negative integer',
        });
      }
      product.stock = numericStock;
    }

    if (discount !== undefined) {
      const numericDiscount = Number(discount);
      if (Number.isNaN(numericDiscount) || numericDiscount < 0 || numericDiscount > 100) {
        return res.status(400).json({
          success: false,
          message: 'Discount must be between 0 and 100',
        });
      }
      product.discount = numericDiscount;
    }

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Inventory updated successfully',
      product: formatProduct(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update inventory',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getInventory,
  updateInventory,
};
