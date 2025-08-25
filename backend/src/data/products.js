const products = [
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    description: "Premium noise-canceling wireless headphones with 30-hour battery life and crystal-clear audio quality.",
    price: 149.99,
    image: "data:image/jpeg;base64,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"
  },
  {
    id: 2,
    title: "Smart Fitness Watch",
    description: "Advanced fitness tracker with heart rate monitoring, GPS, and waterproof design for all your activities.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Laptop Backpack",
    description: "Durable and stylish laptop backpack with multiple compartments and USB charging port.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Wireless Phone Charger",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek and efficient design.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360-degree sound and 12-hour battery life. Perfect for outdoor adventures.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Gaming Mouse",
    description: "High-precision gaming mouse with customizable RGB lighting and programmable buttons.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop"
  }
];

module.exports = products;
