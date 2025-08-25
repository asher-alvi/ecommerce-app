import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts();

    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

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
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
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
        <button onClick={() => setIsCartOpen(true)} className="cart-btn">
          Cart ({cart.length})
        </button>
      </header>
      
      <main className="main">
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
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

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="cart-sidebar">
          <div className="cart-header">
            <h2>Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="close-btn">✖</button>
          </div>
          <div className="cart-items">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-image" />
                  <div className="cart-item-info">
                    <h4>{item.title}</h4>
                    <p>${item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
