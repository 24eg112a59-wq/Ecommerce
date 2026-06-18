const mongoose = require('mongoose');
const Product = require('../models/Product');

const getProductPriceAfterDiscount = (product) => {
  const discountAmount = (product.price * product.discount) / 100;
  return Number((product.price - discountAmount).toFixed(2));
};

const buildProductResponse = (product) => {
  const plainProduct = product.toObject ? product.toObject() : product;

  return {
    ...plainProduct,
    discountedPrice: getProductPriceAfterDiscount(plainProduct),
  };
};

const getProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      sort,
      page = 1,
      limit = 12,
      minPrice,
      maxPrice,
    } = req.query;

    const query = {};

    if (keyword) {
      query.name = { $regex: keyword, $options: 'i' };
    }

    if (category) {
      query.category = { $regex: `^${category}$`, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortOption = {};
    if (sort === 'price_asc') sortOption.price = 1;
    if (sort === 'price_desc') sortOption.price = -1;
    if (sort === 'newest') sortOption.createdAt = -1;
    if (!sort || Object.keys(sortOption).length === 0) sortOption.createdAt = -1;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    const [products, totalProducts] = await Promise.all([
      Product.find(query).sort(sortOption).skip(skip).limit(limitNumber),
      Product.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      count: products.length,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
      products: products.map(buildProductResponse),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

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

    return res.status(200).json({
      success: true,
      product: buildProductResponse(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, image, category, price, stock, discount } = req.body;

    if (!name || !description || !image || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, description, image, category, and price are required',
      });
    }

    const product = await Product.create({
      name,
      description,
      image,
      category,
      price,
      stock: stock ?? 0,
      discount: discount ?? 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: buildProductResponse(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create product',
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

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

    const fieldsToUpdate = ['name', 'description', 'image', 'category', 'price', 'stock', 'discount'];

    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    return res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product: buildProductResponse(product),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

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

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
