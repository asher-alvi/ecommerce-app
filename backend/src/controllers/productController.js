// backend/src/controllers/productController.js
const products = require('../data/products');

const getAllProducts = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById
};
