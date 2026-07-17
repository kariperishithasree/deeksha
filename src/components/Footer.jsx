import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoTextImg from '../assets/logo-text.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-text">
            <h2>Join the Slow Fashion Movement</h2>
            <p>Subscribe to receive stories of our weavers, early access to new collections, and seasonal style edits.</p>
          </div>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
            {isSubscribed && (
              <span className="newsletter-success animate-fade-in">
                Thank you! You have successfully subscribed to Deeksha.
              </span>
            )}
          </form>
        </div>

        <div className="footer-divider"></div>

        {/* Links Grid */}
        <div className="footer-grid">
          <div className="footer-brand-col">
            <div className="footer-logo-heading">
              <img src={logoTextImg} alt="Deeksha" className="footer-logo-image" />
            </div>
            <p className="brand-philosophy">
              Every thread celebrates the hands that create and the women who wear it. We collaborate directly with rural Indian handloom weavers and embroidery artisans to construct premium, high-aesthetic women's pieces that preserve heritage craft and support local economies.
            </p>
            <div className="social-links">
              <a href="https://instagram.com/deeksha.co.in" target="_blank" rel="noopener noreferrer">@deeksha.co.in</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Shop Dresses</h4>
            <ul>
              <li><Link to="/shop?length=Mini">Mini Dresses</Link></li>
              <li><Link to="/shop?length=Midi">Midi Dresses</Link></li>
              <li><Link to="/shop?length=Maxi">Maxi Dresses</Link></li>
              <li><Link to="/shop?filter=isBestSeller">Best Sellers</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Our Story</h4>
            <ul>
              <li><Link to="/about">The Devotion</Link></li>
              <li><Link to="/about#weavers">Our Handlooms</Link></li>
              <li><Link to="/about#embroidery">Handwork Artisans</Link></li>
              <li><Link to="/about#sustainability">Zero-Waste Practice</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Reach Us</h4>
            <p className="contact-info">
              Have inquiries about sizing or customizations? Write to us:
            </p>
            <a href="mailto:deekshascouture@gmail.com" className="contact-email">
              deekshascouture@gmail.com
            </a>
            <p className="contact-info mt-15">
              Phone: +91 98765 43210
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Deeksha. All rights reserved. Crafted with care.
          </p>
          <div className="payment-badges">
            <span>BHIM UPI</span>
            <span>Visa</span>
            <span>MasterCard</span>
            <span>RuPay</span>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer {
          background-color: var(--bg-secondary);
          padding: 80px 0 40px 0;
          border-top: 1px solid var(--border-light);
          margin-top: auto;
        }

        .footer-newsletter {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 60px;
          align-items: center;
          margin-bottom: 60px;
        }

        @media (max-width: 992px) {
          .footer-newsletter {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .newsletter-text h2 {
          font-size: 1.8rem;
          font-weight: 500;
          color: var(--text-dark);
          margin-bottom: 12px;
        }

        .newsletter-text p {
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 500px;
        }

        .newsletter-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          position: relative;
        }

        @media (min-width: 576px) {
          .newsletter-form {
            flex-direction: row;
          }
          .newsletter-form input {
            flex: 1;
          }
        }

        .newsletter-form input {
          border-color: var(--border-light);
          padding: 14px 20px;
        }

        .newsletter-success {
          position: absolute;
          bottom: -30px;
          left: 0;
          font-size: 0.8rem;
          color: var(--accent-olive);
          font-weight: 500;
        }

        .footer-divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-light);
          margin-bottom: 60px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: 1.2fr 1fr;
            gap: 40px;
          }
        }

        @media (max-width: 576px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .footer-logo-heading {
          margin-bottom: 18px;
        }

        .footer-logo-image {
          width: 240px;
          height: auto;
          margin-top: -30px;
          margin-bottom: -20px;
          margin-left: -25px;
          object-fit: contain;
          mix-blend-mode: multiply;
        }

        .brand-philosophy {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 25px;
        }

        .social-links {
          display: flex;
          gap: 20px;
        }

        .social-links a {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-dark);
          font-weight: 500;
        }

        .social-links a:hover {
          color: var(--primary);
        }

        .footer-links-col h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dark);
          margin-bottom: 25px;
          font-weight: 600;
        }

        .footer-links-col ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .footer-links-col a {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .footer-links-col a:hover {
          color: var(--primary);
          padding-left: 3px;
        }

        .contact-info {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }

        .contact-email {
          font-size: 1.05rem;
          font-weight: 500;
          color: var(--primary);
          display: inline-block;
          margin-top: 8px;
        }

        .contact-email:hover {
          text-decoration: underline;
        }

        .mt-15 {
          margin-top: 15px;
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          border-top: 1px solid var(--border-light);
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            gap: 20px;
            text-align: center;
          }
        }

        .copyright {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .payment-badges {
          display: flex;
          gap: 15px;
        }

        .payment-badges span {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
          border: 1.5px solid var(--border-light);
          padding: 3px 8px;
          background-color: var(--white);
        }
      `}</style>
    </footer>
  );
}
