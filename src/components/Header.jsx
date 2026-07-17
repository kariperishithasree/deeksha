import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import logo from '../assets/logo.png';

export default function Header() {
  const { setIsCartOpen, setIsWishlistOpen, cartCount, wishlistCount } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <p>Every thread celebrates the hands that create and the women who wear it</p>
      </div>

      {/* Main Header */}
      <header className="site-header">
        <div className="header-container">
          {/* Mobile Menu Trigger */}
          <button 
            className="mobile-nav-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={22} />
          </button>

          {/* Left Navigation */}
          <nav className="desktop-nav left-nav">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Home
            </NavLink>
            <Link to="/shop?category=everyday" className={new URLSearchParams(location.search).get('category') === 'everyday' ? 'nav-link active' : 'nav-link'}>
              Everyday
            </Link>
            <Link to="/shop?category=heritage" className={new URLSearchParams(location.search).get('category') === 'heritage' ? 'nav-link active' : 'nav-link'}>
              Heritage
            </Link>
            <NavLink to="/about#our-story" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              Our Story
            </NavLink>
          </nav>

          {/* Center Brand */}
          <Link to="/" className="site-logo">
            <img src={logo} alt="Deeksha" className="logo-image-combined" />
          </Link>

          {/* Right Navigation / Icons */}
          <div className="header-icons">
            <button 
              className="icon-btn search-toggle" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <Link to="/about" className="icon-btn profile-link" aria-label="Account">
              <User size={20} />
            </Link>

            <button 
              className="icon-btn wishlist-btn" 
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Open Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && <span className="cart-badge">{wishlistCount}</span>}
            </button>

            <button 
              className="icon-btn cart-btn" 
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>

        {/* Floating Search Panel */}
        {isSearchOpen && (
          <div className="search-overlay animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input 
                type="text" 
                placeholder="Search for pieces (Linen, Chanderi, Mini...)" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-submit-btn">
                <Search size={18} />
              </button>
              <button 
                type="button" 
                className="search-close-btn" 
                onClick={() => setIsSearchOpen(false)}
              >
                <X size={20} />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <img src={logo} alt="Deeksha" className="mobile-menu-logo" />
                <button onClick={() => setIsMobileMenuOpen(false)} className="close-drawer-btn">
                  <X size={24} />
                </button>
              </div>
              <ul className="mobile-menu-links">
                <li>
                  <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                </li>
                <li>
                  <Link to="/shop?category=everyday" onClick={() => setIsMobileMenuOpen(false)}>Everyday</Link>
                </li>
                <li>
                  <Link to="/shop?category=heritage" onClick={() => setIsMobileMenuOpen(false)}>Heritage</Link>
                </li>
                <li>
                  <Link to="/about#our-story" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
                </li>
              </ul>
              <div className="mobile-menu-footer">
                <p>© {new Date().getFullYear()} Deeksha Clothing</p>
                <p>Every thread celebrates the hands that create and the women who wear it</p>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header CSS Styles (Tailored inside index.css or direct variables) */}
      <style>{`
        .announcement-bar {
          background-color: var(--primary);
          color: var(--white);
          text-align: center;
          padding: 8px 10px;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }

        .site-header {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          background-color: rgba(252, 250, 246, 0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid var(--border-light);
          z-index: 100;
          height: var(--header-height);
          display: flex;
          align-items: center;
        }

        .header-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
        }

        @media (max-width: 768px) {
          .header-container {
            grid-template-columns: auto 1fr auto;
            padding: 0 20px;
          }
          .desktop-nav {
            display: none !important;
          }
          .site-logo-text-img {
            display: none;
          }
        }

        .desktop-nav {
          display: flex;
          gap: 30px;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-dark);
          position: relative;
          padding: 10px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1.5px;
          background-color: var(--primary);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link.active::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .site-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .logo-image-combined {
          height: 70px;
          width: auto;
          object-fit: contain;
        }

        .site-logo-text-img {
          height: 35px;
          width: auto;
          object-fit: contain;
        }

        .site-logo-text {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .header-icons {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
          align-items: center;
        }

        .icon-btn {
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .icon-btn:hover {
          background-color: var(--bg-secondary);
          color: var(--primary);
        }

        .cart-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: var(--primary);
          color: var(--white);
          font-size: 0.7rem;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mobile-nav-toggle {
          display: none;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .mobile-nav-toggle {
            display: block;
            margin-right: 15px;
          }
          .profile-link {
            display: none !important;
          }
        }

        /* Search Overlay */
        .search-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: var(--bg-primary);
          display: flex;
          align-items: center;
          padding: 0 40px;
          z-index: 110;
        }

        .search-form {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .search-form input {
          width: 100%;
          border: none;
          border-bottom: 1.5px solid var(--primary);
          background: none;
          padding: 15px 50px 15px 0;
          font-size: 1.2rem;
          font-family: var(--font-sans);
          border-radius: 0;
        }

        .search-form input:focus {
          border-color: var(--primary);
        }

        .search-submit-btn {
          position: absolute;
          right: 40px;
          color: var(--text-muted);
        }

        .search-close-btn {
          position: absolute;
          right: 0;
          color: var(--text-dark);
        }

        /* Mobile Drawer */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        .mobile-menu-drawer {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 80%;
          max-width: 320px;
          background-color: var(--bg-primary);
          padding: 30px;
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 50px;
        }

        .mobile-menu-logo {
          width: 120px;
          height: auto;
          object-fit: contain;
        }

        .close-drawer-btn {
          color: var(--text-dark);
        }

        .mobile-menu-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .mobile-menu-links a {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 400;
          color: var(--text-dark);
        }

        .mobile-menu-links a:hover {
          color: var(--primary);
          padding-left: 5px;
        }

        .mobile-menu-footer {
          margin-top: auto;
          font-size: 0.8rem;
          color: var(--text-light);
          border-top: 1px solid var(--border-light);
          padding-top: 20px;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
