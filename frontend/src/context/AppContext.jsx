import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { demoProducts, demoOrders, demoUsers, demoInventory } from '../data/demoData';
import { getDiscountedPrice } from '../utils/money';
import apiClient from '../utils/apiClient';
import { useAuth } from './AuthContext';

const AppContext = createContext(null);

const initialCart = [
  {
    productId: demoProducts[0].id,
    name: demoProducts[0].name,
    price: demoProducts[0].discountedPrice,
    image: demoProducts[0].image,
    quantity: 1,
  },
  {
    productId: demoProducts[2].id,
    name: demoProducts[2].name,
    price: demoProducts[2].discountedPrice,
    image: demoProducts[2].image,
    quantity: 2,
  },
];

const apiEnabled = (token) => Boolean(token) && !token.startsWith('demo-token-');

const getItemId = (item) => item?._id || item?.id;

const normalizeProduct = (product) => {
  if (!product) return null;

  const price = Number(product.price || 0);
  const discount = Number(product.discount || 0);

  return {
    id: getItemId(product),
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    price,
    stock: Number(product.stock || 0),
    discount,
    discountedPrice: Number(
      (product.discountedPrice ?? getDiscountedPrice(price, discount)).toFixed(2)
    ),
  };
};

const normalizeCartItem = (item) => {
  const product = item.product || {};
  const unitPrice = Number(
    item.unitPrice ?? getDiscountedPrice(product.price || item.price || 0, product.discount || 0)
  );

  return {
    productId: getItemId(product) || item.productId,
    name: product.name || item.name,
    image: product.image || item.image,
    price: unitPrice,
    quantity: Number(item.quantity || 0),
    unitPrice,
    lineTotal: Number((item.lineTotal ?? unitPrice * Number(item.quantity || 0)).toFixed(2)),
    product,
  };
};

const normalizeOrder = (order) => {
  const populatedUser = typeof order.userId === 'object' ? order.userId : null;
  const products = order.products || [];

  return {
    id: getItemId(order),
    userId: getItemId(order.userId) || order.userId,
    userName: order.userName || populatedUser?.name || '',
    userEmail: order.userEmail || populatedUser?.email || '',
    products: products.map((item) => {
      const quantity = Number(item.quantity || 0);
      const price = Number(item.price || 0);

      return {
        productId: getItemId(item.product) || item.productId,
        name: item.name || item.product?.name || '',
        image: item.image || item.product?.image || '',
        quantity,
        price,
        lineTotal: Number((item.lineTotal ?? price * quantity).toFixed(2)),
      };
    }),
    address: order.address || {},
    paymentMethod: order.paymentMethod,
    totalPrice: Number(order.totalPrice || 0).toFixed(2),
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

const normalizeUser = (user) => ({
  id: getItemId(user),
  name: user.name,
  email: user.email,
  role: user.role,
});

const normalizeInventoryItem = (product) => ({
  id: getItemId(product),
  name: product.name,
  stock: Number(product.stock || 0),
  discount: Number(product.discount || 0),
});

const computeCartTotal = (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

export const AppProvider = ({ children }) => {
  const { currentUser, token, logout: authLogout, isAdmin } = useAuth();
  const [authUser, setAuthUser] = useState(currentUser);
  const [cartItems, setCartItems] = useState(initialCart);
  const [products, setProducts] = useState(demoProducts.map(normalizeProduct));
  const [orders, setOrders] = useState(demoOrders.map(normalizeOrder));
  const [users, setUsers] = useState(demoUsers.map(normalizeUser));
  const [inventory, setInventory] = useState(demoInventory.map(normalizeInventoryItem));

  useEffect(() => {
    setAuthUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { data } = await apiClient.get('/products');
        if (data?.products?.length) {
          const normalizedProducts = data.products.map(normalizeProduct).filter(Boolean);
          setProducts(normalizedProducts);
          setInventory(normalizedProducts.map(normalizeInventoryItem));
          return;
        }
      } catch (error) {
        // Fall back to demo products when the backend is unavailable.
      }

      const fallbackProducts = demoProducts.map(normalizeProduct);
      setProducts(fallbackProducts);
      setInventory(fallbackProducts.map(normalizeInventoryItem));
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadAccountData = async () => {
      if (!authUser) {
        setCartItems(initialCart);
        setOrders(demoOrders.map(normalizeOrder));
        setUsers(demoUsers.map(normalizeUser));
        return;
      }

      if (!apiEnabled(token)) {
        setOrders(demoOrders.map(normalizeOrder));
        setUsers(demoUsers.map(normalizeUser));
        return;
      }

      try {
        const [cartResponse, orderResponse] = await Promise.all([
          apiClient.get('/cart'),
          authUser.role === 'admin' ? apiClient.get('/admin/orders') : apiClient.get('/orders/my-orders'),
        ]);

        if (cartResponse.data?.cart) {
          setCartItems((cartResponse.data.cart.items || []).map(normalizeCartItem));
        }

        if (orderResponse.data?.orders) {
          setOrders(orderResponse.data.orders.map(normalizeOrder));
        }

        if (authUser.role === 'admin') {
          const [usersResponse, inventoryResponse] = await Promise.all([
            apiClient.get('/admin/users'),
            apiClient.get('/admin/inventory'),
          ]);

          if (usersResponse.data?.users) {
            setUsers(usersResponse.data.users.map(normalizeUser));
          }

          if (inventoryResponse.data?.inventory) {
            setInventory(inventoryResponse.data.inventory.map(normalizeInventoryItem));
          }
        }
      } catch (error) {
        setCartItems(initialCart);
        setOrders(demoOrders.map(normalizeOrder));
        setUsers(demoUsers.map(normalizeUser));
        setInventory(demoInventory.map(normalizeInventoryItem));
      }
    };

    loadAccountData();
  }, [authUser, token]);

  const refreshProducts = async () => {
    try {
      const { data } = await apiClient.get('/products');
      if (data?.products?.length) {
        const normalizedProducts = data.products.map(normalizeProduct).filter(Boolean);
        setProducts(normalizedProducts);
        setInventory(normalizedProducts.map(normalizeInventoryItem));
      }
    } catch (error) {
      // Keep the current state if the refresh request fails.
    }
  };

  const refreshCart = async () => {
    if (!apiEnabled(token)) {
      return;
    }

    const { data } = await apiClient.get('/cart');
    setCartItems((data.cart?.items || []).map(normalizeCartItem));
  };

  const refreshOrders = async () => {
    if (!authUser || !apiEnabled(token)) {
      return;
    }

    const endpoint = authUser.role === 'admin' ? '/admin/orders' : '/orders/my-orders';
    const { data } = await apiClient.get(endpoint);
    setOrders((data.orders || []).map(normalizeOrder));
  };

  const refreshUsers = async () => {
    if (!authUser || authUser.role !== 'admin' || !apiEnabled(token)) {
      return;
    }

    const { data } = await apiClient.get('/admin/users');
    setUsers((data.users || []).map(normalizeUser));
  };

  const refreshInventory = async () => {
    if (!authUser || authUser.role !== 'admin' || !apiEnabled(token)) {
      return;
    }

    const { data } = await apiClient.get('/admin/inventory');
    setInventory((data.inventory || []).map(normalizeInventoryItem));
  };

  const addToCart = async (product, quantity = 1) => {
    const productId = typeof product === 'string' ? product : product.id;
    const resolvedProduct = products.find((item) => item.id === productId) || product;

    if (apiEnabled(token)) {
      try {
        const { data } = await apiClient.post('/cart/items', { productId, quantity });
        if (data.cart?.items) {
          setCartItems(data.cart.items.map(normalizeCartItem));
          return;
        }
      } catch (error) {
        // Fall back to local optimistic updates.
      }
    }

    setCartItems((current) => {
      const existing = current.find((item) => item.productId === productId);
      const unitPrice = Number(resolvedProduct.discountedPrice ?? resolvedProduct.price ?? 0);

      if (existing) {
        return current.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }

      return [
        ...current,
        {
          productId,
          name: resolvedProduct.name,
          price: unitPrice,
          image: resolvedProduct.image,
          quantity,
          unitPrice,
          lineTotal: Number((unitPrice * quantity).toFixed(2)),
          product: resolvedProduct,
        },
      ];
    });
  };

  const updateCartQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      await removeFromCart(productId);
      return;
    }

    if (apiEnabled(token)) {
      try {
        const { data } = await apiClient.put(`/cart/items/${productId}`, { quantity });
        if (data.cart?.items) {
          setCartItems(data.cart.items.map(normalizeCartItem));
          return;
        }
      } catch (error) {
        // Fall back to local state update.
      }
    }

    setCartItems((current) =>
      current.map((item) => (item.productId === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = async (productId) => {
    if (apiEnabled(token)) {
      try {
        const { data } = await apiClient.delete(`/cart/items/${productId}`);
        if (data.cart?.items) {
          setCartItems(data.cart.items.map(normalizeCartItem));
          return;
        }
      } catch (error) {
        // Fall back to local state update.
      }
    }

    setCartItems((current) => current.filter((item) => item.productId !== productId));
  };

  const clearCart = async () => {
    if (apiEnabled(token)) {
      try {
        const { data } = await apiClient.delete('/cart');
        if (data.cart?.items) {
          setCartItems([]);
          return;
        }
      } catch (error) {
        // Fall back to local state update.
      }
    }

    setCartItems([]);
  };

  const placeOrder = async (address, paymentMethod) => {
    if (apiEnabled(token)) {
      try {
        const { data } = await apiClient.post('/orders', { address, paymentMethod });
        await Promise.all([refreshCart(), refreshOrders(), refreshInventory()]);
        return normalizeOrder(data.order);
      } catch (error) {
        // Fall back to demo local ordering when the backend request fails.
      }
    }

    const nextOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().slice(0, 10),
      status: 'Placed',
      paymentMethod,
      address,
      items: cartItems,
      totalPrice: computeCartTotal(cartItems),
    };

    setOrders((current) => [nextOrder, ...current]);
    setCartItems([]);
    return nextOrder;
  };

  const updateProductStock = async (productId, stock, discount) => {
    if (apiEnabled(token) && authUser?.role === 'admin') {
      try {
        await apiClient.patch(`/admin/inventory/${productId}`, { stock, discount });
        await Promise.all([refreshProducts(), refreshInventory()]);
        return;
      } catch (error) {
        // Fall back to local inventory updates.
      }
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock,
              discount,
              discountedPrice: getDiscountedPrice(product.price, discount),
            }
          : product
      )
    );
    setInventory((current) =>
      current.map((item) => (item.id === productId ? { ...item, stock, discount } : item))
    );
  };

  const updateOrderStatus = async (orderId, status) => {
    if (apiEnabled(token) && authUser?.role === 'admin') {
      try {
        await apiClient.put(`/admin/orders/${orderId}/status`, { status });
        await refreshOrders();
        return;
      } catch (error) {
        // Fall back to local update.
      }
    }

    setOrders((current) => current.map((order) => (order.id === orderId ? { ...order, status } : order)));
  };

  const addProduct = async (product) => {
    const payload = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
      discount: Number(product.discount),
    };

    if (apiEnabled(token) && authUser?.role === 'admin') {
      try {
        await apiClient.post('/products', payload);
        await Promise.all([refreshProducts(), refreshInventory()]);
        return;
      } catch (error) {
        // Fall back to local create.
      }
    }

    const newProduct = {
      ...payload,
      id: `P-${String(products.length + 1).padStart(3, '0')}`,
      discountedPrice: getDiscountedPrice(payload.price, payload.discount),
    };

    setProducts((current) => [newProduct, ...current]);
    setInventory((current) => [normalizeInventoryItem(newProduct), ...current]);
  };

  const editProduct = async (productId, updatedFields) => {
    const payload = {
      ...updatedFields,
      price: Number(updatedFields.price),
      stock: Number(updatedFields.stock),
      discount: Number(updatedFields.discount),
    };

    if (apiEnabled(token) && authUser?.role === 'admin') {
      try {
        await apiClient.put(`/products/${productId}`, payload);
        await Promise.all([refreshProducts(), refreshInventory()]);
        return;
      } catch (error) {
        // Fall back to local edit.
      }
    }

    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              ...payload,
              discountedPrice: getDiscountedPrice(
                payload.price ?? product.price,
                payload.discount ?? product.discount
              ),
            }
          : product
      )
    );

    setInventory((current) =>
      current.map((product) =>
        product.id === productId ? { ...product, stock: payload.stock, discount: payload.discount } : product
      )
    );
  };

  const deleteProduct = async (productId) => {
    if (apiEnabled(token) && authUser?.role === 'admin') {
      try {
        await apiClient.delete(`/products/${productId}`);
        await Promise.all([refreshProducts(), refreshInventory()]);
        return;
      } catch (error) {
        // Fall back to local delete.
      }
    }

    setProducts((current) => current.filter((product) => product.id !== productId));
    setInventory((current) => current.filter((product) => product.id !== productId));
  };

  const value = useMemo(
    () => ({
      authUser,
      loginAsUser: async () => authUser,
      loginAsAdmin: async () => authUser,
      logout: authLogout,
      cartItems,
      products,
      orders,
      users,
      inventory,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      updateProductStock,
      addProduct,
      editProduct,
      deleteProduct,
      setUsers,
    }),
    [authUser, cartItems, products, orders, users, inventory, token, authLogout]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }

  return context;
};

const computeDiscountedPrice = (price, discount) => {
  const discountedPrice = Number(price) - (Number(price) * Number(discount || 0)) / 100;
  return Number(discountedPrice.toFixed(2));
};
