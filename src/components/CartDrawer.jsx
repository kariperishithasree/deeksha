import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  const FREE_SHIPPING_THRESHOLD = 6000;
  const shippingLeft = FREE_SHIPPING_THRESHOLD - cartTotal;
  const isFreeShipping = shippingLeft <= 0;
  const progressPercent = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer-overlay animate-fade-in" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="title-area">
            <ShoppingBag size={20} className="header-icon" />
            <h2>Your Bag</h2>
            <span className="count-bubble">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
          </div>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress */}
        {cartItems.length > 0 && (
          <div className="shipping-progress-container">
            <p className="shipping-progress-text">
              {isFreeShipping ? (
                <strong>Congratulations! You have unlocked Free Shipping! 🎉</strong>
              ) : (
                <>Add <strong>₹{shippingLeft.toLocaleString('en-IN')}</strong> more for <strong>FREE Shipping</strong></>
              )}
            </p>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart-view animate-fade-in-up">
              <ShoppingBag size={48} className="empty-icon" />
              <h3>Your bag is empty</h3>
              <p>Explore our handcrafted collection of sustainable women's pieces.</p>
              <Link 
                to="/shop" 
                className="btn btn-primary shop-now-btn"
                onClick={() => setIsCartOpen(false)}
              >
                Shop Collection
              </Link>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.size}-${JSON.stringify(item.metadata)}`}
                  className="cart-item"
                >
                  <div className="item-img-wrapper">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-header">
                      <h4 className="item-title">{item.product.name}</h4>
                      <button 
                        className="item-remove-btn" 
                        onClick={() => removeFromCart(item.product.id, item.size, item.metadata)}
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="item-meta">Size: {item.size} | Fabric: {item.product.fabric}</p>
                    {item.metadata?.height && (
                      <p className="item-meta">Height: {item.metadata.height}</p>
                    )}
                    {item.metadata?.measurements && (
                      <div className="item-measurements">
                        <strong>Measurements:</strong>
                        <ul>
                          {Object.entries(item.metadata.measurements).map(([key, value]) =>
                            value ? (
                              <li key={key}>
                                {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                              </li>
                            ) : null
                          )}
                        </ul>
                      </div>
                    )}
                    <div className="item-footer">
                      <div className="quantity-selector">
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.product.id, item.size, -1, item.metadata)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="qty-val">{item.quantity}</span>
                        <button 
                          className="qty-btn" 
                          onClick={() => updateQuantity(item.product.id, item.size, 1, item.metadata)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="item-price">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal</span>
              <span className="total-price">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <p className="tax-shipping-info">Shipping and taxes calculated at checkout.</p>
            
            <div className="note-section">
              <label htmlFor="cart-notes">Add Order Note (Optional)</label>
              <textarea 
                id="cart-notes" 
                placeholder="Special instructions or customization details (e.g. gift wrap)..."
                rows="2"
              ></textarea>
            </div>

            <Link 
              to="/checkout" 
              className="btn btn-primary checkout-btn"
              onClick={() => setIsCartOpen(false)}
            >
              Proceed to Checkout
            </Link>
            
            <button 
              className="continue-shopping" 
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style>{`
        .cart-drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
        }

        .cart-drawer {
          background-color: var(--bg-primary);
          width: 100%;
          max-width: 440px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 30px;
          border-bottom: 1px solid var(--border-light);
        }

        .cart-drawer-header .title-area {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
        }

        .cart-drawer-header h2 {
          font-size: 1.35rem;
          font-weight: 500;
          color: var(--text-dark);
        }

        .count-bubble {
          background-color: var(--bg-secondary);
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 20px;
        }

        .close-cart-btn {
          color: var(--text-dark);
        }

        .shipping-progress-container {
          padding: 15px 30px;
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
        }

        .shipping-progress-text {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-bottom: 8px;
        }

        .progress-track {
          width: 100%;
          height: 4px;
          background-color: var(--border-light);
        }

        .progress-bar {
          height: 100%;
          background-color: var(--primary);
          transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cart-drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 30px;
        }

        .empty-cart-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
        }

        .empty-icon {
          color: var(--text-light);
          margin-bottom: 15px;
          opacity: 0.5;
        }

        .empty-cart-view h3 {
          font-size: 1.2rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .empty-cart-view p {
          font-size: 0.9rem;
          color: var(--text-muted);
          margin-bottom: 25px;
        }

        .shop-now-btn {
          padding: 12px 25px;
          font-size: 0.85rem;
        }

        .cart-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 15px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
        }

        .item-img-wrapper {
          background-color: var(--bg-secondary);
          overflow: hidden;
          height: 100px;
        }

        .item-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 10px;
        }

        .item-title {
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--text-dark);
          line-height: 1.3;
        }

        .item-remove-btn {
          color: var(--text-light);
          padding-top: 2px;
        }

        .item-remove-btn:hover {
          color: var(--primary);
        }

        .item-meta {
          font-size: 0.78rem;
          color: var(--text-light);
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-light);
        }

        .qty-btn {
          padding: 5px 8px;
          color: var(--text-muted);
        }

        .qty-btn:hover {
          color: var(--text-dark);
          background-color: var(--bg-secondary);
        }

        .qty-val {
          font-size: 0.85rem;
          padding: 0 10px;
          font-weight: 500;
        }

        .item-price {
          font-weight: 500;
          font-size: 0.92rem;
          color: var(--text-dark);
        }

        .cart-drawer-footer {
          padding: 24px 30px;
          border-top: 1px solid var(--border-light);
          background-color: var(--bg-primary);
        }

        .subtotal-row {
          display: flex;
          justify-content: space-between;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .total-price {
          color: var(--primary);
          font-weight: 600;
        }

        .tax-shipping-info {
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 20px;
        }

        .note-section {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
        }

        .note-section label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
        }

        .note-section textarea {
          border: 1px solid var(--border-light);
          background-color: var(--bg-secondary);
          font-size: 0.85rem;
          padding: 10px;
          resize: none;
        }

        .checkout-btn {
          width: 100%;
          margin-bottom: 10px;
        }

        .continue-shopping {
          width: 100%;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
