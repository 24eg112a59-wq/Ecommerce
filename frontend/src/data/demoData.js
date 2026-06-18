export const demoProducts = [
  {
    id: 'P-001',
    name: 'Wireless Headphones',
    description: 'Noise-isolating headphones with deep bass and long battery life.',
    image: 'https://images.unsplash.com/photo-1518441902117-f0a5c2dd6f17?auto=format&fit=crop&w=900&q=80',
    category: 'Electronics',
    price: 5999,
    stock: 24,
    discount: 12,
    discountedPrice: 5279.88,
  },
  {
    id: 'P-002',
    name: 'Classic Sneakers',
    description: 'Lightweight sneakers designed for all-day comfort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
    category: 'Footwear',
    price: 3499,
    stock: 16,
    discount: 8,
    discountedPrice: 3219.08,
  },
  {
    id: 'P-003',
    name: 'Smart Watch',
    description: 'Track your fitness, notifications, and daily goals with style.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80',
    category: 'Wearables',
    price: 8999,
    stock: 9,
    discount: 15,
    discountedPrice: 7649.15,
  },
  {
    id: 'P-004',
    name: 'Minimal Backpack',
    description: 'Everyday backpack with a padded laptop compartment.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80',
    category: 'Accessories',
    price: 2199,
    stock: 31,
    discount: 5,
    discountedPrice: 2089.05,
  },
];

export const demoUsers = [
  { id: 'U-001', name: 'Student Shopper', email: 'user@shopez.com', role: 'user' },
  { id: 'U-002', name: 'Admin Owner', email: 'admin@shopez.com', role: 'admin' },
  { id: 'U-003', name: 'Aarav Singh', email: 'aarav@example.com', role: 'user' },
  { id: 'U-004', name: 'Meera Patel', email: 'meera@example.com', role: 'user' },
];

export const demoOrders = [
  {
    id: 'ORD-001',
    date: '2026-06-12',
    status: 'Delivered',
    paymentMethod: 'UPI',
    totalPrice: '8498.96',
    address: {
      fullName: 'Student Shopper',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
    items: [
      { productId: 'P-001', name: 'Wireless Headphones', quantity: 1, price: 5279.88 },
      { productId: 'P-003', name: 'Smart Watch', quantity: 1, price: 7649.15 },
    ],
  },
  {
    id: 'ORD-002',
    date: '2026-06-15',
    status: 'Processing',
    paymentMethod: 'COD',
    totalPrice: '3219.08',
    address: {
      fullName: 'Student Shopper',
      city: 'Bengaluru',
      state: 'Karnataka',
    },
    items: [{ productId: 'P-002', name: 'Classic Sneakers', quantity: 1, price: 3219.08 }],
  },
];

export const demoInventory = demoProducts.map((product) => ({
  id: product.id,
  name: product.name,
  stock: product.stock,
  discount: product.discount,
}));
