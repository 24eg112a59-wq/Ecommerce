import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { initialProducts } from '../data/catalog';
import { getDiscountedPrice } from '../utils/money';
import { useAuth } from './AuthContext';

const StoreContext = createContext(null);

const CART_KEY = 'shopez_cart';
const ORDERS_KEY = 'shopez_orders';
const PRODUCTS_KEY = 'shopez_products';

const loadStoredProducts = () => {
  const storedProducts = localStorage.getItem(PRODUCTS_KEY);
  if (storedProducts) {
    return JSON.parse(storedProducts);
  }

  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  return initialProducts;
};

const loadStoredCart = () => {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
};

const loadStoredOrders = () => {
  const storedOrders = localStorage.getItem(ORDERS_KEY);
  return storedOrders ? JSON.parse(storedOrders) : [];
};

export const StoreProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [products, setProducts] = useState(loadStoredProducts);
  const [cart, setCart] = useState(loadStoredCart);
  const [orders, setOrders] = useState(loadStoredOrders);

  useEffect(() => {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  const getProductById = (productId) => products.find((product) => product.id === productId);

  const addProduct = (product) => {
    setProducts((currentProducts) => [
      {
        ...product,
        id: `p${Date.now()}`,
      },
      ...currentProducts,
    ]);
  };

  const updateProduct = (productId, nextProduct) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => (product.id === productId ? { ...product, ...nextProduct } : product))
    );
  };

  const deleteProduct = (productId) => {
    setProducts((currentProducts) => currentProducts.filter((product) => product.id !== productId));
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  };

  const addToCart = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.productId === productId);
      const nextQuantity = existingItem ? existingItem.quantity + quantity : quantity;

      if (nextQuantity > product.stock) {
        throw new Error('Requested quantity exceeds available stock');
      }

      if (existingItem) {
        return currentCart.map((item) =>
          item.productId === productId ? { ...item, quantity: nextQuantity } : item
        );
      }

      return [...currentCart, { productId, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    const product = getProductById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    if (quantity > product.stock) {
      throw new Error('Requested quantity exceeds available stock');
    }

    setCart((currentCart) =>
      currentCart.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = ({ address, paymentMethod }) => {
    if (!currentUser) {
      throw new Error('You must be logged in to place an order');
    }

    if (!cart.length) {
      throw new Error('Cart is empty');
    }

    const items = cart.map((item) => {
      const product = getProductById(item.productId);
      const price = getDiscountedPrice(product.price, product.discount);
      return {
        productId: product.id,
        name: product.name,
        image: product.image,
        price,
        quantity: item.quantity,
        lineTotal: Number((price * item.quantity).toFixed(2)),
      };
    });

    const totalPrice = items.reduce((sum, item) => sum + item.lineTotal, 0);

    const order = {
      id: `o${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      products: items,
      address,
      paymentMethod,
      totalPrice: Number(totalPrice.toFixed(2)),
      status: 'Placed',
      createdAt: new Date().toISOString(),
    };

    setOrders((currentOrders) => [order, ...currentOrders]);
    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const cartItem = cart.find((item) => item.productId === product.id);
        if (!cartItem) {
          return product;
        }
        return {
          ...product,
          stock: Math.max(product.stock - cartItem.quantity, 0),
        };
      })
    );
    setCart([]);

    return order;
  };

  const updateInventory = (productId, updates) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) => (product.id === productId ? { ...product, ...updates } : product))
    );
  };

  const userOrders = useMemo(
    () => orders.filter((order) => order.userId === currentUser?.id),
    [currentUser, orders]
  );

  const inventorySummary = useMemo(
    () => ({
      totalProducts: products.length,
      lowStockProducts: products.filter((product) => product.stock <= 5),
    }),
    [products]
  );

  const cartItems = useMemo(
    () =>
      cart
        .map((item) => {
          const product = getProductById(item.productId);
          if (!product) {
            return null;
          }

          const unitPrice = getDiscountedPrice(product.price, product.discount);
          return {
            ...item,
            product,
            unitPrice,
            lineTotal: Number((unitPrice * item.quantity).toFixed(2)),
          };
        })
        .filter(Boolean),
    [cart, products]
  );

  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.lineTotal, 0);

  const value = useMemo(
    () => ({
      products,
      cartItems,
      cartQuantity,
      cartTotal,
      orders,
      userOrders,
      inventorySummary,
      getProductById,
      addProduct,
      updateProduct,
      deleteProduct,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      updateInventory,
    }),
    [cartItems, cartQuantity, cartTotal, inventorySummary, orders, products, userOrders]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
