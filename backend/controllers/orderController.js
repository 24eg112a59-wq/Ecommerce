const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

const getEntityId = (entity) => {
  if (!entity) {
    return null;
  }

  if (typeof entity === 'string') {
    return entity;
  }

  if (entity._id) {
    return entity._id.toString();
  }

  return entity.toString();
};

const getDiscountedPrice = (product) => {
  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);
  return Number((price - (price * discount) / 100).toFixed(2));
};

const formatOrder = (order) => {
  const plainOrder = order.toObject ? order.toObject() : order;

  return {
    ...plainOrder,
    totalPrice: Number(plainOrder.totalPrice || 0).toFixed(2),
  };
};

const getCheckoutSummary = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');

    if (!cart || !cart.products.length) {
      return res.status(200).json({
        success: true,
        message: 'Cart is empty',
        cart: {
          items: [],
          quantity: 0,
          totalPrice: '0.00',
        },
      });
    }

    const items = cart.products.map((item) => {
      const product = item.product?.toObject ? item.product.toObject() : item.product;
      const unitPrice = getDiscountedPrice(product);
      const lineTotal = Number((unitPrice * item.quantity).toFixed(2));

      return {
        product,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      };
    });

    const totalPrice = items.reduce((sum, item) => sum + item.lineTotal, 0);
    const quantity = items.reduce((sum, item) => sum + item.quantity, 0);

    return res.status(200).json({
      success: true,
      cart: {
        items,
        quantity,
        totalPrice: Number(totalPrice.toFixed(2)).toFixed(2),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to load checkout data',
      error: error.message,
    });
  }
};

const placeOrder = async (req, res) => {
  try {
    const { address, paymentMethod } = req.body;

    if (!address || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: 'Address and paymentMethod are required',
      });
    }

    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.product');

    if (!cart || !cart.products.length) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty',
      });
    }

    const orderItems = [];
    let totalPrice = 0;

    for (const item of cart.products) {
      const product = item.product;

      if (!product) {
        return res.status(400).json({
          success: false,
          message: 'One or more products are unavailable',
        });
      }

      if (item.quantity > product.stock) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const price = getDiscountedPrice(product);
      const lineTotal = Number((price * item.quantity).toFixed(2));

      orderItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price,
        quantity: item.quantity,
      });

      totalPrice += lineTotal;
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      userId: req.user._id,
      products: orderItems,
      address,
      paymentMethod,
      totalPrice: Number(totalPrice.toFixed(2)),
      status: 'Placed',
    });

    cart.products = [];
    cart.quantity = 0;
    await cart.save();

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      order: formatOrder(order),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to place order',
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });

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
      message: 'Failed to fetch all orders',
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

    const isOwner = getEntityId(order.userId) === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order',
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

module.exports = {
  getCheckoutSummary,
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  getOrderById,
};
