import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Success

  // Form states
  const [shippingForm, setShippingForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    state: ''
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [shippingMethod, setShippingMethod] = useState('standard');
  const shippingCost = shippingMethod === 'express' ? 350 : (cartTotal >= 6000 ? 0 : 150);
  const finalTotal = cartTotal + shippingCost;

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setStep(3);
    clearCart(); // Clear cart globally upon successful checkout simulation
  };

  if (cartItems.length === 0 && step !== 3) {
    return (
      <div className="container section text-center" style={{ minHeight: '60vh' }}>
        <h2>Your Bag is empty</h2>
        <p className="mt-10">Add some sustainable pieces before checking out.</p>
        <Link to="/shop" className="btn btn-primary mt-20">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page animate-fade-in">
      <div className="container section">
        {/* Step indicator */}
        {step !== 3 && (
          <div className="checkout-steps">
            <div className={`step-item ${step >= 1 ? 'active' : ''}`}>
              <span className="step-num">1</span>
              <span className="step-label">Shipping</span>
            </div>
            <div className="step-connector"></div>
            <div className={`step-item ${step >= 2 ? 'active' : ''}`}>
              <span className="step-num">2</span>
              <span className="step-label">Payment</span>
            </div>
          </div>
        )}

        <div className="checkout-layout">
          {/* Main Form Area */}
          <div className="checkout-form-container">
            {step === 1 && (
              <form onSubmit={handleShippingSubmit} className="checkout-step-form">
                <h2>Shipping Information</h2>
                <div className="form-grid">
                  <div className="input-group">
                    <label htmlFor="firstName">First Name</label>
                    <input 
                      type="text" 
                      id="firstName"
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                      type="text" 
                      id="lastName"
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group col-span-2">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email"
                      value={shippingForm.email}
                      onChange={(e) => setShippingForm({ ...shippingForm, email: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group col-span-2">
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone"
                      value={shippingForm.phone}
                      onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group col-span-2">
                    <label htmlFor="address">Address</label>
                    <input 
                      type="text" 
                      id="address"
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="city">City</label>
                    <input 
                      type="text" 
                      id="city"
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="state">State</label>
                    <input 
                      type="text" 
                      id="state"
                      value={shippingForm.state}
                      onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input 
                      type="text" 
                      id="postalCode"
                      value={shippingForm.postalCode}
                      onChange={(e) => setShippingForm({ ...shippingForm, postalCode: e.target.value })}
                      required 
                    />
                  </div>
                </div>

                <div className="shipping-methods">
                  <h3>Shipping Method</h3>
                  <div className="methods-list">
                    <label className={`method-card ${shippingMethod === 'standard' ? 'checked' : ''}`}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="standard"
                        checked={shippingMethod === 'standard'}
                        onChange={() => setShippingMethod('standard')}
                      />
                      <div className="method-info">
                        <span className="method-title">Standard Shipping</span>
                        <span className="method-time">3-5 business days</span>
                      </div>
                      <span className="method-price">
                        {cartTotal >= 6000 ? 'FREE' : '₹150'}
                      </span>
                    </label>

                    <label className={`method-card ${shippingMethod === 'express' ? 'checked' : ''}`}>
                      <input 
                        type="radio" 
                        name="shipping" 
                        value="express"
                        checked={shippingMethod === 'express'}
                        onChange={() => setShippingMethod('express')}
                      />
                      <div className="method-info">
                        <span className="method-title">Express Tailoring Delivery</span>
                        <span className="method-time">1-2 business days</span>
                      </div>
                      <span className="method-price">₹350</span>
                    </label>
                  </div>
                </div>

                <div className="step-actions">
                  <Link to="/shop" className="btn btn-secondary back-btn">
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Return to Shop
                  </Link>
                  <button type="submit" className="btn btn-primary next-btn">
                    Continue to Payment <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="checkout-step-form">
                <h2>Payment Information</h2>
                <div className="payment-security-badge">
                  <ShieldCheck size={18} />
                  <span>Secure 256-bit encrypted simulated environment</span>
                </div>
                
                <div className="form-grid">
                  <div className="input-group col-span-2">
                    <label htmlFor="cardName">Cardholder Name</label>
                    <input 
                      type="text" 
                      id="cardName"
                      value={paymentForm.cardName}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardName: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="input-group col-span-2">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input 
                      type="text" 
                      id="cardNumber"
                      placeholder="1234 5678 9101 1121"
                      value={paymentForm.cardNumber}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                      maxLength="19"
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="expiry">Expiry Date</label>
                    <input 
                      type="text" 
                      id="expiry"
                      placeholder="MM/YY"
                      value={paymentForm.expiry}
                      onChange={(e) => setPaymentForm({ ...paymentForm, expiry: e.target.value })}
                      maxLength="5"
                      required 
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="cvv">CVV</label>
                    <input 
                      type="password" 
                      id="cvv"
                      placeholder="***"
                      value={paymentForm.cvv}
                      onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                      maxLength="3"
                      required 
                    />
                  </div>
                </div>

                <div className="step-actions">
                  <button type="button" className="btn btn-secondary back-btn" onClick={() => setStep(1)}>
                    <ArrowLeft size={16} style={{ marginRight: '8px' }} /> Return to Shipping
                  </button>
                  <button type="submit" className="btn btn-primary next-btn">
                    Place Devoted Order <CreditCard size={16} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <div className="order-success-view animate-fade-in-up">
                <CheckCircle size={64} className="success-icon" />
                <h1>Your order has been initiated!</h1>
                <p className="success-subtitle">
                  An order confirmation email has been sent to <strong>{shippingForm.email}</strong>.
                </p>
                <div className="order-summary-box">
                  <h3>Order Summary</h3>
                  <div className="summary-rows">
                    <div className="summary-row">
                      <span>Delivery Address:</span>
                      <strong>{shippingForm.address}, {shippingForm.city} - {shippingForm.postalCode}</strong>
                    </div>
                    <div className="summary-row">
                      <span>Stitch Queue Position:</span>
                      <strong>#234 (Tailoring begins tomorrow)</strong>
                    </div>
                    <div className="summary-row">
                      <span>Final Charged:</span>
                      <strong className="total-charged">₹{finalTotal.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
                <Link to="/shop" className="btn btn-primary continue-shopping-btn">
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Right Summary Column (Visible during forms) */}
          {step !== 3 && (
            <div className="checkout-summary-column">
              <h2>Order Summary</h2>
              <div className="summary-items-list">
                {cartItems.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="summary-item">
                    <div className="s-img-wrapper">
                      <img src={item.product.image} alt={item.product.name} />
                    </div>
                    <div className="s-details">
                      <h4>{item.product.name}</h4>
                      <p>Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="s-price">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary-divider"></div>

              <div className="summary-prices">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="price-row">
                  <span>Shipping</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="price-row total-row">
                  <span>Total</span>
                  <span className="total-val">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .checkout-steps {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 50px;
        }

        .step-item {
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .step-item.active {
          opacity: 1;
        }

        .step-num {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1.5px solid var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.85rem;
        }

        .step-item.active .step-num {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }

        .step-label {
          font-size: 0.9rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .step-connector {
          width: 80px;
          height: 1px;
          background-color: var(--border-light);
          margin: 0 15px;
        }

        /* Layout Grid */
        .checkout-layout {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          gap: 60px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .checkout-form-container {
          background-color: var(--white);
          border: 1px solid var(--border-light);
          padding: 40px;
        }

        @media (max-width: 576px) {
          .checkout-form-container {
            padding: 20px;
          }
        }

        .checkout-step-form h2 {
          font-size: 1.5rem;
          font-weight: 500;
          margin-bottom: 25px;
          color: var(--text-dark);
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 30px;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        @media (max-width: 576px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
          .col-span-2 {
            grid-column: unset;
          }
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .input-group label {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .input-group input {
          border-color: var(--border-light);
          background-color: var(--bg-primary);
          padding: 12px 15px;
        }

        /* Shipping card methods */
        .shipping-methods {
          margin-top: 40px;
          margin-bottom: 40px;
        }

        .shipping-methods h3 {
          font-size: 1rem;
          font-weight: 500;
          margin-bottom: 15px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .methods-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .method-card {
          border: 1px solid var(--border-light);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
          background-color: var(--bg-primary);
        }

        .method-card:hover {
          border-color: var(--text-dark);
        }

        .method-card.checked {
          border-color: var(--primary);
          background-color: var(--bg-secondary);
        }

        .method-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .method-title {
          font-weight: 500;
          font-size: 0.95rem;
          color: var(--text-dark);
        }

        .method-time {
          font-size: 0.8rem;
          color: var(--text-light);
        }

        .method-price {
          font-weight: 600;
          color: var(--primary);
          font-size: 0.95rem;
        }

        .step-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
          border-top: 1px solid var(--border-light);
          padding-top: 30px;
        }

        .back-btn, .next-btn {
          font-size: 0.85rem;
        }

        .payment-security-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--accent-olive);
          background-color: #e2ecdb;
          padding: 10px 15px;
          margin-bottom: 25px;
        }

        /* Success screen styling */
        .order-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 30px 0;
        }

        .success-icon {
          color: var(--accent-olive);
          margin-bottom: 20px;
        }

        .order-success-view h1 {
          font-size: 2.2rem;
          font-weight: 400;
          margin-bottom: 12px;
        }

        .success-subtitle {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 40px;
        }

        .order-summary-box {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 30px;
          width: 100%;
          max-width: 500px;
          margin-bottom: 40px;
          text-align: left;
        }

        .order-summary-box h3 {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 15px;
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 10px;
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          gap: 20px;
        }

        .summary-row span {
          color: var(--text-light);
        }

        .total-charged {
          color: var(--primary);
          font-size: 1.05rem;
        }

        .continue-shopping-btn {
          padding: 15px 40px;
        }

        /* Sidebar summary Column */
        .checkout-summary-column {
          background-color: var(--bg-secondary);
          border: 1px solid var(--border-light);
          padding: 40px;
        }

        .checkout-summary-column h2 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 25px;
          color: var(--text-dark);
          border-bottom: 1px solid var(--border-light);
          padding-bottom: 10px;
        }

        .summary-items-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .summary-item {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 15px;
        }

        .s-img-wrapper {
          background-color: var(--white);
          overflow: hidden;
          height: 75px;
          border: 1px solid var(--border-light);
        }

        .s-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .s-details h4 {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-dark);
          line-height: 1.3;
        }

        .s-details p {
          font-size: 0.78rem;
          color: var(--text-light);
        }

        .s-price {
          font-weight: 500;
          margin-top: 4px;
          font-size: 0.88rem;
        }

        .summary-divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-light);
          margin: 20px 0;
        }

        .summary-prices {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .price-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .total-row {
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-dark);
        }

        .total-val {
          color: var(--primary);
        }
      `}</style>
    </div>
  );
}
