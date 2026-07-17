import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistDrawer() {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlistItems,
    removeFromWishlist,
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="wishlist-drawer-overlay animate-fade-in" onClick={() => setIsWishlistOpen(false)}>
      <div className="wishlist-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="wishlist-drawer-header">
          <div className="title-area">
            <Heart size={20} className="header-icon" />
            <h2>Your Wishlist</h2>
            <span className="count-bubble">{wishlistItems.length}</span>
          </div>
          <button className="close-cart-btn" onClick={() => setIsWishlistOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <div className="wishlist-drawer-content">
          {wishlistItems.length === 0 ? (
            <div className="empty-cart-view animate-fade-in-up">
              <Heart size={48} className="empty-icon" />
              <h3>Your wishlist is empty</h3>
              <p>Save pieces you love and come back to them anytime.</p>
              <Link
                to="/shop"
                className="btn btn-primary shop-now-btn"
                onClick={() => setIsWishlistOpen(false)}
              >
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="wishlist-items-list">
              {wishlistItems.map((product) => (
                <div key={product.id} className="wishlist-item">
                  <div className="item-img-wrapper">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="item-details">
                    <div className="item-header">
                      <h4 className="item-title">{product.name}</h4>
                      <button
                        className="item-remove-btn"
                        onClick={() => removeFromWishlist(product.id)}
                        aria-label="Remove from wishlist"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="item-meta">{product.fabric}</p>
                    <div className="item-footer">
                      <p className="item-price">₹{product.price.toLocaleString('en-IN')}</p>
                      <Link
                        to={`/product/${product.id}`}
                        className="view-product-link"
                        onClick={() => setIsWishlistOpen(false)}
                      >
                        View <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .wishlist-drawer-overlay {
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

        .wishlist-drawer {
          background-color: var(--bg-primary);
          width: 100%;
          max-width: 440px;
          height: 100%;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .wishlist-drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 30px;
          border-bottom: 1px solid var(--border-light);
        }

        .wishlist-drawer-header .title-area {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--primary);
        }

        .wishlist-drawer-header h2 {
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

        .wishlist-drawer-content {
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

        .wishlist-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .wishlist-item {
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
          color: var(--text-muted);
        }

        .item-remove-btn:hover {
          color: var(--primary);
        }

        .item-meta {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin: 6px 0;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }

        .item-price {
          font-weight: 600;
          color: var(--primary);
        }

        .view-product-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .view-product-link:hover {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
