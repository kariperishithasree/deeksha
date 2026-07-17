import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load cart and wishlist from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('deeksha_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart storage', e);
      }
    }

    const savedWishlist = localStorage.getItem('deeksha_wishlist');
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error parsing wishlist storage', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem('deeksha_cart', JSON.stringify(items));
  };

  const saveWishlist = (items) => {
    setWishlistItems(items);
    localStorage.setItem('deeksha_wishlist', JSON.stringify(items));
  };

  const metadataEquals = (a, b) => JSON.stringify(a || {}) === JSON.stringify(b || {});

  const addToCart = (product, size, metadata = {}) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.size === size &&
        metadataEquals(item.metadata, metadata)
    );

    if (existingIndex > -1) {
      const newItems = [...cartItems];
      newItems[existingIndex].quantity += 1;
      saveCart(newItems);
    } else {
      saveCart([...cartItems, { product, size, quantity: 1, metadata }]);
    }
    // Automatically open cart drawer for better UI feedback
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, size, metadata = {}) => {
    const newItems = cartItems.filter(
      (item) =>
        !(item.product.id === productId && item.size === size && metadataEquals(item.metadata, metadata))
    );
    saveCart(newItems);
  };

  const updateQuantity = (productId, size, delta, metadata = {}) => {
    const newItems = cartItems.map((item) => {
      if (
        item.product.id === productId &&
        item.size === size &&
        metadataEquals(item.metadata, metadata)
      ) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty > 0 ? newQty : 1 };
      }
      return item;
    });
    saveCart(newItems);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const addToWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (!exists) {
      const newItems = [...wishlistItems, product];
      saveWishlist(newItems);
    }
  };

  const removeFromWishlist = (productId) => {
    const newItems = wishlistItems.filter((item) => item.id !== productId);
    saveWishlist(newItems);
  };

  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id);
    if (exists) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId) => wishlistItems.some((item) => item.id === productId);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const wishlistCount = wishlistItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
