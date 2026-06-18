const mongoose = require('mongoose');
const Cart = require('../models/Cart');
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

const calculateCartSummary = (cart) => {
  const products = cart.products || [];

  let totalQuantity = 0;
  let totalPrice = 0;

  const items = products.map((item) => {
    const product = item.product?.toObject ? item.product.toObject() : item.product;
    const productPrice = product ? Number(product.price) : 0;
    const discount = product ? Number(product.discount || 0) : 0;
    const discountedPrice = Number((productPrice - (productPrice * discount) / 100).toFixed(2));
    const lineTotal = Number((discountedPrice * item.quantity).toFixed(2));

    totalQuantity += item.quantity;
    totalPrice += lineTotal;

    return {
      product,
      quantity: item.quantity,
      unitPrice: discountedPrice,
      lineTotal,
    };
  });

  return {
    _id: cart._id,
    userId: cart.userId,
    items,
    quantity: totalQuantity,
    totalPrice: Number(totalPrice.toFixed(2)),
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
};

const getUserCartDocument = async (userId) => {
  let cart = await Cart.findOne({ userId }).populate('products.product');

  if (!cart) {
    cart = await Cart.create({ userId, products: [], quantity: 0 });
    cart = await Cart.findById(cart._id).populate('products.product');
  }

  return cart;
};

const syncCartQuantity = (cart) => {
  cart.quantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
};

const getCart = async (req, res) => {
  try {
    const cart = await getUserCartDocument(req.user._id);

    return res.status(200).json({
      success: true,
      cart: calculateCartSummary(cart),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch cart',
      error: error.message,
    });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid productId is required',
      });
    }

    const requestedQuantity = Number(quantity);
    if (!Number.isInteger(requestedQuantity) || requestedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive integer',
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const cart = await getUserCartDocument(req.user._id);
    const existingItem = cart.products.find(
      (item) => getEntityId(item.product) === product._id.toString()
    );

    const newQuantity = existingItem
      ? existingItem.quantity + requestedQuantity
      : requestedQuantity;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity exceeds available stock',
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      cart.products.push({ product: product._id, quantity: requestedQuantity });
    }

    syncCartQuantity(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('products.product');

    return res.status(200).json({
      success: true,
      message: 'Product added to cart',
      cart: calculateCartSummary(populatedCart),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add item to cart',
      error: error.message,
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid productId is required',
      });
    }

    const updatedQuantity = Number(quantity);
    if (!Number.isInteger(updatedQuantity) || updatedQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be a positive integer',
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const cart = await getUserCartDocument(req.user._id);
    const item = cart.products.find(
      (cartItem) => getEntityId(cartItem.product) === product._id.toString()
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Product is not in the cart',
      });
    }

    if (updatedQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity exceeds available stock',
      });
    }

    item.quantity = updatedQuantity;
    syncCartQuantity(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('products.product');

    return res.status(200).json({
      success: true,
      message: 'Cart quantity updated',
      cart: calculateCartSummary(populatedCart),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update cart quantity',
      error: error.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: 'Valid productId is required',
      });
    }

    const cart = await getUserCartDocument(req.user._id);
    const initialLength = cart.products.length;

    cart.products = cart.products.filter(
      (item) => getEntityId(item.product) !== productId
    );

    if (cart.products.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: 'Product is not in the cart',
      });
    }

    syncCartQuantity(cart);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('products.product');

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart',
      cart: calculateCartSummary(populatedCart),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to remove product from cart',
      error: error.message,
    });
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await getUserCartDocument(req.user._id);
    cart.products = [];
    cart.quantity = 0;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('products.product');

    return res.status(200).json({
      success: true,
      message: 'Cart cleared successfully',
      cart: calculateCartSummary(populatedCart),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to clear cart',
      error: error.message,
    });
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
};
