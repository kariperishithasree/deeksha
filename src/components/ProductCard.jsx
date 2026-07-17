import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Eye, ShoppingCart, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { customManagementNote } from '../data/products';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState('');

  const handleQuickAdd = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, size);
  };

  const handleQuickViewAdd = () => {
    if (!selectedQuickViewSize) {
      alert("Please select a size first");
      return;
    }
    addToCart(product, selectedQuickViewSize);
    setIsQuickViewOpen(false);
    setSelectedQuickViewSize('');
  };

  return (
    <>
      <div 
        className="product-card animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`} className="product-image-wrapper">
          <img 
            src={product.image} 
            alt={product.name} 
            className={`product-img ${isHovered ? 'zoomed' : ''}`}
          />
          
          {/* Card badges */}
          <div className="product-badges">
            {product.isBestSeller && <span className="card-badge-item best">Best Seller</span>}
            <span className="card-badge-item sustainable">100% Handloom</span>
          </div>

          {/* Quick Actions Panel overlay */}
          <div className={`quick-actions ${isHovered ? 'visible' : ''}`}>
            <button 
              className={`quick-action-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(product);
              }}
              title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            >
              <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="quick-action-btn"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsQuickViewOpen(true);
              }}
              title="Quick View"
            >
              <Eye size={18} />
            </button>
          </div>

          {/* Quick Add Sizes Panel */}
          <div className={`quick-sizes ${isHovered ? 'visible' : ''}`}>
            <p className="quick-sizes-title">Quick Add</p>
            <div className="sizes-grid">
              {product.sizes.map(size => (
                <button 
                  key={size}
                  className="quick-size-btn"
                  onClick={(e) => handleQuickAdd(size, e)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </Link>

        {/* Product Info */}
        <div className="product-info">
          <span className="product-fabric">{product.fabric}</span>
          <h3 className="product-title">
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
          <p className="product-custom-note">{customManagementNote}</p>
        </div>
      </div>

      {/* Quick View Modal */}
      {isQuickViewOpen && (
        <div className="modal-overlay" onClick={() => setIsQuickViewOpen(false)}>
          <div className="quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quickview-close" onClick={() => setIsQuickViewOpen(false)}>
              <X size={20} />
            </button>
            
            <div className="quickview-content">
              <div className="quickview-gallery">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="quickview-details">
                <span className="badge badge-sustainable">{product.fabric}</span>
                <h2>{product.name}</h2>
                <p className="qv-price">₹{product.price.toLocaleString('en-IN')}</p>
                <div className="qv-divider"></div>
                <p className="qv-desc">{product.description}</p>
                
                <div className="qv-size-selector">
                  <p className="section-title">Select Size</p>
                  <div className="qv-sizes">
                    {product.sizes.map(size => (
                      <button 
                        key={size} 
                        className={`qv-size-btn ${selectedQuickViewSize === size ? 'active' : ''}`}
                        onClick={() => setSelectedQuickViewSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button className="btn btn-primary qv-add-btn" onClick={handleQuickViewAdd}>
                  <ShoppingCart size={18} style={{ marginRight: '10px' }} />
                  Add to Cart
                </button>

                <button 
                  className={`btn qv-wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                >
                  <Heart size={18} style={{ marginRight: '10px' }} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  {isInWishlist(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
                </button>

                <Link to={`/product/${product.id}`} className="qv-view-details" onClick={() => setIsQuickViewOpen(false)}>
                  View Full Product Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS styling for Card and Quick View Modal */}
      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .product-image-wrapper {
          position: relative;
          width: 100%;
          padding-top: 130%; /* 4:5 aspect ratio */
          background-color: var(--bg-secondary);
          overflow: hidden;
          display: block;
        }

        .product-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-img.zoomed {
          transform: scale(1.08);
        }

        .product-badges {
          position: absolute;
          top: 15px;
          left: 15px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          z-index: 10;
        }

        .card-badge-item {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 4px 10px;
        }

        .card-badge-item.best {
          background-color: var(--primary);
          color: var(--white);
        }

        .card-badge-item.sustainable {
          background-color: #e2ecdb;
          color: var(--accent-olive);
        }

        .quick-actions {
          position: absolute;
          top: 15px;
          right: 15px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          opacity: 0;
          transform: translateX(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        .quick-actions.visible {
          opacity: 1;
          transform: translateX(0);
        }

        .quick-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: var(--white);
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-sm);
          transition: all 0.3s ease;
        }

        .quick-action-btn:hover,
        .quick-action-btn.active {
          background-color: var(--primary);
          color: var(--white);
        }

        .quick-sizes {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: rgba(252, 250, 246, 0.95);
          backdrop-filter: blur(5px);
          padding: 15px;
          transform: translateY(100%);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
          border-top: 1px solid var(--border-light);
        }

        .quick-sizes.visible {
          transform: translateY(0);
        }

        .quick-sizes-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
          margin-bottom: 8px;
          text-align: center;
        }

        .sizes-grid {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .quick-size-btn {
          font-size: 0.8rem;
          width: 32px;
          height: 32px;
          border: 1px solid var(--border-light);
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
        }

        .quick-size-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
          background-color: var(--bg-primary);
        }

        .product-info {
          padding: 15px 0;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .product-fabric {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
        }

        .product-title {
          font-size: 1.05rem;
          font-weight: 400;
          color: var(--text-dark);
          line-height: 1.4;
          margin-bottom: 2px;
        }

        .product-title a:hover {
          color: var(--primary);
        }

        .product-price {
          font-weight: 500;
          color: var(--primary);
          font-size: 1rem;
        }

        .product-custom-note {
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin-top: 2px;
        }

        /* Quick View Modal Structure */
        .quickview-modal {
          background-color: var(--bg-primary);
          width: 90%;
          max-width: 900px;
          height: auto;
          max-height: 90vh;
          position: relative;
          padding: 40px;
          box-shadow: var(--shadow-lg);
          overflow-y: auto;
          animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .quickview-modal {
            padding: 20px;
            width: 95%;
          }
        }

        .quickview-close {
          position: absolute;
          top: 20px;
          right: 20px;
          color: var(--text-dark);
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .quickview-close:hover {
          background-color: var(--bg-secondary);
        }

        .quickview-content {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .quickview-content {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .quickview-gallery {
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .quickview-gallery img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          max-height: 480px;
        }

        .quickview-details {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .quickview-details h2 {
          font-size: 1.6rem;
          margin: 10px 0 5px 0;
          color: var(--text-dark);
        }

        .qv-price {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 15px;
        }

        .qv-divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-light);
          margin-bottom: 15px;
        }

        .qv-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          margin-bottom: 25px;
          line-height: 1.6;
        }

        .qv-size-selector {
          margin-bottom: 25px;
        }

        .qv-size-selector .section-title {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-light);
          margin-bottom: 10px;
        }

        .qv-sizes {
          display: flex;
          gap: 10px;
        }

        .qv-size-btn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border-light);
          color: var(--text-dark);
          font-weight: 500;
          font-size: 0.85rem;
        }

        .qv-size-btn:hover {
          border-color: var(--text-dark);
        }

        .qv-size-btn.active {
          border-color: var(--primary);
          background-color: var(--primary);
          color: var(--white);
        }

        .qv-add-btn {
          width: 100%;
          margin-bottom: 15px;
        }

        .qv-wishlist-btn {
          width: 100%;
          justify-content: center;
          margin-bottom: 15px;
          border: 1px solid var(--border-light);
          background-color: var(--white);
          color: var(--text-dark);
        }

        .qv-wishlist-btn.active {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }

        .qv-view-details {
          text-align: center;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          text-decoration: underline;
        }

        .qv-view-details:hover {
          color: var(--primary);
        }
      `}</style>
    </>
  );
}
