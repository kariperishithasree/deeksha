import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Checkout from './pages/Checkout';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';

// Force window to scroll to top on every path change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router basename="/deeksha">
      <ScrollToTop />
      <CartProvider>
        <div 
          className="app-container" 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            minHeight: "100vh" 
          }}
        >
          {/* 1. Header sits at the very top */}
          <Header />
          
          {/* Drawers stay hidden until clicked */}
          <CartDrawer />
          <WishlistDrawer />
          
          {/* 2. Main content area takes up all remaining middle space */}
          <main style={{ flex: "1 0 auto", width: "100%" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          
          {/* 3. Footer is strictly locked to the bottom */}
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}