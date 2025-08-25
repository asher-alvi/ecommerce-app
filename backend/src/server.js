// backend/src/server.js
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Root route - THIS WAS MISSING!
app.get('/', (req, res) => {
  res.status(200).json({ 
    message: 'Ecommerce Backend API is running!',
    status: 'success',
    endpoints: {
      health: '/health',
      products: '/api/products'
    },
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api', productRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export for Vercel
module.exports = app;
