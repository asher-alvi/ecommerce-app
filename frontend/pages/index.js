import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState(() => {
    // ✅ Load from localStorage on first render
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    // ✅ Save cart to localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const fetchProducts = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/products`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      
      const data = await response.json();
      setProducts(data.data || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    console.log("Cart:", [...cart, product]);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error Loading Products</h2>
        <p>{error}</p>
        <button onClick={fetchProducts} className="retry-btn">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🛒 E-Commerce Store</h1>
        <p>Discover amazing products at great prices</p>
        <p>Cart Items: {cart.length}</p>
      </header>
      
      <main className="main">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
        
        {products.length === 0 && (
          <div className="no-products">
            <h3>No products available</h3>
            <p>Check back later for new arrivals!</p>
          </div>
        )}
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 E-Commerce Store. Built with Next.js & Node.js</p>
      </footer>
    </div>
  );
}
