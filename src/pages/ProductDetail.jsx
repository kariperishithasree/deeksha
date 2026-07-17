import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, customManagementNote } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import { Heart, ChevronDown, ChevronUp, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('details');
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [customMeasurements, setCustomMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState({
    shoulderLength: '',
    armhole: '',
    upperChest: '',
    chest: '',
    lowerChest: '',
    pointLength: '',
    bodiceLength: '',
    waist: '',
    tummy: '',
    hip: '',
    sleevesLength: '',
    bicep: '',
    elbowRounding: '',
    frontNeckLength: '',
    backNeckLength: '',
    dressLength: '',
    cropTopLength: '',
    cropTopRound: '',
    lehengaLength: '',
    pantLength: '',
    thigh: '',
    ankle: ''
  });

  const sizeGuideData = {
    XS: {
      uk: '4',
      us: '2',
      aus: '4',
      eu: '32',
      shoulderLength: '13 in',
      armhole: '16 in',
      upperChest: '32 in',
      chest: '32 in',
      lowerChest: '34 in',
      pointLength: '20 in',
      bodiceLength: '14 in',
      waist: '24 in',
      tummy: '26 in',
      hip: '34 in',
      sleevesLength: '22 in',
      bicep: '10 in',
      elbowRounding: '9 in',
      frontNeckLength: '7 in',
      backNeckLength: '7 in',
      dressLength: '43 in',
      cropTopLength: '16 in',
      cropTopRound: '30 in',
      lehengaLength: '40 in',
      pantLength: '38 in',
      thigh: '20 in',
      ankle: '8 in'
    },
    S: {
      uk: '6',
      us: '4',
      aus: '6',
      eu: '34',
      shoulderLength: '13.5 in',
      armhole: '16.5 in',
      upperChest: '34 in',
      chest: '34 in',
      lowerChest: '36 in',
      pointLength: '20.5 in',
      bodiceLength: '14.5 in',
      waist: '26 in',
      tummy: '28 in',
      hip: '36 in',
      sleevesLength: '22.5 in',
      bicep: '10.5 in',
      elbowRounding: '9.5 in',
      frontNeckLength: '7.2 in',
      backNeckLength: '7.2 in',
      dressLength: '44 in',
      cropTopLength: '16.5 in',
      cropTopRound: '32 in',
      lehengaLength: '41 in',
      pantLength: '39 in',
      thigh: '21 in',
      ankle: '8.2 in'
    },
    M: {
      uk: '8',
      us: '6',
      aus: '8',
      eu: '36',
      shoulderLength: '14 in',
      armhole: '17 in',
      upperChest: '36 in',
      chest: '36 in',
      lowerChest: '38 in',
      pointLength: '21 in',
      bodiceLength: '15 in',
      waist: '28 in',
      tummy: '30 in',
      hip: '38 in',
      sleevesLength: '23 in',
      bicep: '11 in',
      elbowRounding: '10 in',
      frontNeckLength: '7.5 in',
      backNeckLength: '7.5 in',
      dressLength: '45 in',
      cropTopLength: '17 in',
      cropTopRound: '34 in',
      lehengaLength: '42 in',
      pantLength: '40 in',
      thigh: '22 in',
      ankle: '8.5 in'
    },
    L: {
      uk: '10',
      us: '8',
      aus: '10',
      eu: '38',
      shoulderLength: '14.5 in',
      armhole: '17.5 in',
      upperChest: '38 in',
      chest: '38 in',
      lowerChest: '40 in',
      pointLength: '21.5 in',
      bodiceLength: '15.5 in',
      waist: '30 in',
      tummy: '32 in',
      hip: '40 in',
      sleevesLength: '23.5 in',
      bicep: '11.5 in',
      elbowRounding: '10.5 in',
      frontNeckLength: '7.7 in',
      backNeckLength: '7.7 in',
      dressLength: '46 in',
      cropTopLength: '17.5 in',
      cropTopRound: '36 in',
      lehengaLength: '43 in',
      pantLength: '41 in',
      thigh: '23 in',
      ankle: '9 in'
    },
    XL: {
      uk: '12',
      us: '10',
      aus: '12',
      eu: '40',
      shoulderLength: '15 in',
      armhole: '18 in',
      upperChest: '40 in',
      chest: '40 in',
      lowerChest: '42 in',
      pointLength: '22 in',
      bodiceLength: '16 in',
      waist: '32 in',
      tummy: '34 in',
      hip: '42 in',
      sleevesLength: '24 in',
      bicep: '12 in',
      elbowRounding: '11 in',
      frontNeckLength: '8 in',
      backNeckLength: '8 in',
      dressLength: '47 in',
      cropTopLength: '18 in',
      cropTopRound: '38 in',
      lehengaLength: '44 in',
      pantLength: '42 in',
      thigh: '24 in',
      ankle: '9.5 in'
    }
    ,
    XXL: {
      uk: '14',
      us: '12',
      aus: '14',
      eu: '42',
      shoulderLength: '16 in',
      armhole: '19 in',
      upperChest: '42 in',
      chest: '42 in',
      lowerChest: '44 in',
      pointLength: '23 in',
      bodiceLength: '17 in',
      waist: '34 in',
      tummy: '36 in',
      hip: '44 in',
      sleevesLength: '24.5 in',
      bicep: '12.5 in',
      elbowRounding: '11.5 in',
      frontNeckLength: '8.2 in',
      backNeckLength: '8.2 in',
      dressLength: '48 in',
      cropTopLength: '19 in',
      cropTopRound: '40 in',
      lehengaLength: '45 in',
      pantLength: '43 in',
      thigh: '25 in',
      ankle: '10 in'
    }
  };

  const pretty = (k) => k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());

  const selectedSizeGuide = sizeGuideData[selectedSize];

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize('');
      window.scrollTo(0, 0);
    }
  }, [id]);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (!selectedSize) {
      window.alert('Please select a size before adding to bag.');
      return;
    }

    const heightParts = [];
    if (heightFeet) heightParts.push(`${heightFeet} ft`);
    if (heightInches) heightParts.push(`${heightInches} in`);
    const height = heightParts.join(' ');

    const metadata = {};
    if (height) metadata.height = height;
    if (customMeasurements) {
      const cleanedMeasurements = Object.fromEntries(
        Object.entries(measurements).filter(([_, value]) => value)
      );
      if (Object.keys(cleanedMeasurements).length) {
        metadata.measurements = cleanedMeasurements;
      }
    }

    addToCart(product, selectedSize, metadata);
  };

  const relatedProducts = product
    ? products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="container section text-center" style={{ minHeight: '50vh' }}>
        <h2>Frock not found</h2>
        <Link to="/shop" className="btn btn-primary mt-20">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container section product-detail-page">
      <div className="breadcrumb">
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <span className="current">{product.name}</span>
      </div>

      <div className="detail-layout">
        <div className="gallery-section">
          <div className="main-image-container">
            <img
              src={product.secondaryImage || product.image}
              alt={product.name}
              className="detail-main-img"
            />
          </div>
          <div className="zoom-hint">Tap or hover to preview the texture</div>
        </div>

        <div className="details-section">
          <div className="detail-fabric-badge">{product.fabric}</div>
          <h1 className="detail-title">{product.name}</h1>
          {product.tagline && <div className="detail-tagline">{product.tagline}</div>}
          <div className="detail-price">₹{product.price.toLocaleString('en-IN')}</div>
          <div className="detail-description">{product.description}</div>

          <div className="detail-size-selector">
            <div className="selector-header">
              <span>Select Size</span>
              <button
                type="button"
                className="size-guide-trigger"
                onClick={() => setShowSizeGuide((prev) => !prev)}
              >
                {showSizeGuide ? 'Hide Size Guide' : 'Show Size Guide'}
              </button>
            </div>
            <div className="size-buttons">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => handleSizeSelect(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {showSizeGuide && (
            <div className="sizeguide-inline">
              <div className="sizeguide-content">
                <h3>Size Guide</h3>
                <p>Reference conversions and body measurements (in inches)</p>

                <table className="sizeguide-table">
                  <thead>
                    <tr>
                      <th>SIZE</th>
                      <th>UK SIZE</th>
                      <th>US SIZE</th>
                      <th>AUS SIZE</th>
                      <th>EU</th>
                      <th>BUST</th>
                      <th>WAIST</th>
                      <th>HIPS</th>
                      <th>SHOULDER</th>
                      <th>ARMHOLE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(sizeGuideData).map(([size, vals]) => (
                      <tr key={size}>
                        <td>{size}</td>
                        <td>{vals.uk || 'N/A'}</td>
                        <td>{vals.us || 'N/A'}</td>
                        <td>{vals.aus || 'N/A'}</td>
                        <td>{vals.eu || 'N/A'}</td>
                        <td>{vals.chest}</td>
                        <td>{vals.waist}</td>
                        <td>{vals.hip}</td>
                        <td>{vals.shoulderLength}</td>
                        <td>{vals.armhole}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                
              </div>
            </div>
          )}

          <div className="height-custom-panel">
            <div className="sizeguide-row">
              <label>Feet</label>
              <select value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)}>
                <option value="">Choose Height</option>
                <option value="4">4</option>
                <option value="4.5">4.5</option>
                <option value="5">5</option>
                <option value="5.5">5.5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="sizeguide-row">
              <label>Inches</label>
              <select value={heightInches} onChange={(e) => setHeightInches(e.target.value)}>
                <option value="">Choose</option>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={i}>{i}</option>
                ))}
              </select>
            </div>

            <div className="sizeguide-row">
              <label>Custom Measurement</label>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={customMeasurements}
                  onChange={(e) => setCustomMeasurements(e.target.checked)}
                />
                <span className="slider"></span>
              </label>
            </div>

            {customMeasurements && (
              <div className="measurements-grid">
                <div className="measure-input">
                  <label>Shoulder Length (in)</label>
                  <input
                    placeholder="e.g. 14"
                    value={measurements.shoulderLength}
                    onChange={(e) => setMeasurements({ ...measurements, shoulderLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Armhole (Round) (in)</label>
                  <input
                    placeholder="e.g. 17"
                    value={measurements.armhole}
                    onChange={(e) => setMeasurements({ ...measurements, armhole: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Upper Chest (Round) (in)</label>
                  <input
                    placeholder="e.g. 36"
                    value={measurements.upperChest}
                    onChange={(e) => setMeasurements({ ...measurements, upperChest: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Chest (Round) (in)</label>
                  <input
                    placeholder="e.g. 36"
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({ ...measurements, chest: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Lower Chest (Round) (in)</label>
                  <input
                    placeholder="e.g. 38"
                    value={measurements.lowerChest}
                    onChange={(e) => setMeasurements({ ...measurements, lowerChest: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Point Length (in)</label>
                  <input
                    placeholder="e.g. 21"
                    value={measurements.pointLength}
                    onChange={(e) => setMeasurements({ ...measurements, pointLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Bodice Length (in)</label>
                  <input
                    placeholder="e.g. 15"
                    value={measurements.bodiceLength}
                    onChange={(e) => setMeasurements({ ...measurements, bodiceLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Waist (Round) (in)</label>
                  <input
                    placeholder="e.g. 28"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Tummy (in)</label>
                  <input
                    placeholder="e.g. 30"
                    value={measurements.tummy}
                    onChange={(e) => setMeasurements({ ...measurements, tummy: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Hip (Round) (in)</label>
                  <input
                    placeholder="e.g. 38"
                    value={measurements.hip}
                    onChange={(e) => setMeasurements({ ...measurements, hip: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Sleeves Length (in)</label>
                  <input
                    placeholder="e.g. 23"
                    value={measurements.sleevesLength}
                    onChange={(e) => setMeasurements({ ...measurements, sleevesLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Bicep (in)</label>
                  <input
                    placeholder="e.g. 11"
                    value={measurements.bicep}
                    onChange={(e) => setMeasurements({ ...measurements, bicep: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Elbow Rounding (in)</label>
                  <input
                    placeholder="e.g. 10"
                    value={measurements.elbowRounding}
                    onChange={(e) => setMeasurements({ ...measurements, elbowRounding: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Front Neck (Length) (in)</label>
                  <input
                    placeholder="e.g. 7.5"
                    value={measurements.frontNeckLength}
                    onChange={(e) => setMeasurements({ ...measurements, frontNeckLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Back Neck (Length) (in)</label>
                  <input
                    placeholder="e.g. 7.5"
                    value={measurements.backNeckLength}
                    onChange={(e) => setMeasurements({ ...measurements, backNeckLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Dress Length (in)</label>
                  <input
                    placeholder="e.g. 45"
                    value={measurements.dressLength}
                    onChange={(e) => setMeasurements({ ...measurements, dressLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Crop Top (Length) (in)</label>
                  <input
                    placeholder="e.g. 17"
                    value={measurements.cropTopLength}
                    onChange={(e) => setMeasurements({ ...measurements, cropTopLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Crop Top (Round) (in)</label>
                  <input
                    placeholder="e.g. 34"
                    value={measurements.cropTopRound}
                    onChange={(e) => setMeasurements({ ...measurements, cropTopRound: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Lehenga Length (in)</label>
                  <input
                    placeholder="e.g. 42"
                    value={measurements.lehengaLength}
                    onChange={(e) => setMeasurements({ ...measurements, lehengaLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Pant Length (in)</label>
                  <input
                    placeholder="e.g. 40"
                    value={measurements.pantLength}
                    onChange={(e) => setMeasurements({ ...measurements, pantLength: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Thigh (in)</label>
                  <input
                    placeholder="e.g. 22"
                    value={measurements.thigh}
                    onChange={(e) => setMeasurements({ ...measurements, thigh: e.target.value })}
                  />
                </div>
                <div className="measure-input">
                  <label>Ankle (in)</label>
                  <input
                    placeholder="e.g. 8.5"
                    value={measurements.ankle}
                    onChange={(e) => setMeasurements({ ...measurements, ankle: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="detail-actions">
            <button className="btn btn-primary add-to-bag-btn" onClick={handleAddToBag}>
              Add to Bag
            </button>
            <button
              type="button"
              className={`wishlist-btn ${isInWishlist(product.id) ? 'active' : ''}`}
              aria-label={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
              onClick={() => toggleWishlist(product)}
            >
              <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="trust-values">
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <span>100% Biodegradable Craft Fabric</span>
            </div>
            <div className="trust-item">
              <HelpCircle size={18} className="trust-icon" />
              <span>Free returns & custom alterations</span>
            </div>
          </div>

          <div className="custom-management-card">
            <h3>Custom Management</h3>
            <p>{customManagementNote}</p>
          </div>

          <div className="detail-divider" />

          <div className="accordions-container">
            <div className="accordion-item">
              <button
                type="button"
                className={`accordion-header ${activeTab === 'details' ? 'open' : ''}`}
                onClick={() => setActiveTab(activeTab === 'details' ? '' : 'details')}
              >
                <span>Product Details</span>
                {activeTab === 'details' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {activeTab === 'details' && (
                <div className="accordion-content">
                  <p>{product.description}</p>
                  <ul className="details-list">
                    <li><strong>Length:</strong> {product.length}</li>
                    <li><strong>Colorway:</strong> {product.color}</li>
                    <li><strong>Silhouette:</strong> Gathering at waist with structural side pockets</li>
                  </ul>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="related-section">
        <div className="section-header text-center">
          <span className="section-subtitle">RECOMMENDED PIECES</span>
          <h2 className="section-title">Complete The Look</h2>
        </div>
        <div className="products-grid">
          {relatedProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </div>

      <style>{`
        .breadcrumb {
          display: flex;
          gap: 10px;
          font-size: 0.8rem;
          color: var(--text-light);
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .breadcrumb a:hover {
          color: var(--primary);
        }

        .breadcrumb .current {
          color: var(--text-dark);
          font-weight: 500;
        }

        .detail-layout {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 60px;
          margin-bottom: 100px;
        }

        @media (max-width: 992px) {
          .detail-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        .gallery-section {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .main-image-container {
          position: relative;
          background-color: var(--bg-secondary);
          overflow: hidden;
          width: 100%;
          padding-top: 125%;
          cursor: crosshair;
        }

        .detail-main-img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .zoom-hint {
          font-size: 0.78rem;
          color: var(--text-light);
          text-align: center;
          font-style: italic;
        }

        .details-section {
          display: flex;
          flex-direction: column;
        }

        .detail-fabric-badge {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--primary);
          font-weight: 600;
          margin-bottom: 8px;
        }

        .detail-title {
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--text-dark);
          line-height: 1.2;
          margin-bottom: 10px;
        }

        .detail-tagline {
          font-size: 1rem;
          color: var(--text-muted);
          margin-bottom: 18px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }

        .detail-price {
          font-size: 1.45rem;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 16px;
        }

        .detail-description {
          color: var(--text-muted);
          line-height: 1.75;
          margin-bottom: 28px;
          max-width: 680px;
        }

        .detail-divider {
          width: 100%;
          height: 1px;
          background-color: var(--border-light);
          margin: 20px 0;
        }

        .detail-size-selector {
          margin-bottom: 30px;
        }

        .selector-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-light);
          margin-bottom: 12px;
        }

        .size-guide-trigger {
          text-decoration: underline;
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          color: var(--text-muted);
          font: inherit;
        }

        .size-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .size-btn {
          width: 54px;
          height: 46px;
          border: 1px solid var(--border-light);
          color: var(--text-dark);
          font-weight: 500;
          font-size: 0.95rem;
          background: transparent;
          cursor: pointer;
        }

        .size-btn:hover {
          border-color: var(--text-dark);
        }

        .size-btn.active {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }

        .detail-actions {
          display: flex;
          gap: 15px;
          margin-bottom: 35px;
          flex-wrap: wrap;
        }

        .add-to-bag-btn {
          flex: 1;
        }

        .wishlist-btn {
          width: 50px;
          height: 50px;
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dark);
          background: transparent;
          cursor: pointer;
        }

        .wishlist-btn:hover,
        .wishlist-btn.active {
          border-color: var(--primary);
          color: var(--primary);
          background-color: #f7efe9;
        }

        .trust-values {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .trust-icon {
          color: var(--accent-olive);
        }

        .custom-management-card {
          margin-top: 20px;
          padding: 16px 18px;
          border: 1px solid var(--border-light);
          background-color: #f9f4ec;
        }

        .custom-management-card h3 {
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-dark);
          margin-bottom: 8px;
        }

        .custom-management-card p {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        .sizeguide-inline {
          width: 100%;
          background-color: #fbf6ef;
          padding: 18px;
          border: 1px solid var(--border-light);
          border-radius: 4px;
          margin: 18px 0;
        }

        .sizeguide-table {
          width: 100%;
          border-collapse: collapse;
          margin: 12px 0 18px 0;
          font-size: 0.92rem;
        }

        .sizeguide-table th,
        .sizeguide-table td {
          border: 1px solid rgba(0,0,0,0.06);
          padding: 10px 12px;
          text-align: left;
        }

        .sizeguide-table thead th {
          background: #fff;
          text-transform: uppercase;
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.06em;
        }

        .sizeguide-table tbody td {
          color: var(--text-dark);
        }

        .height-custom-panel {
          margin-bottom: 18px;
        }

        .sizeguide-row {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .sizeguide-row label {
          width: 140px;
          font-weight: 600;
          color: var(--text-dark);
        }

        .sizeguide-row select,
        .sizeguide-row input {
          padding: 8px 10px;
          border: 1px solid var(--border-light);
          border-radius: 4px;
          min-width: 180px;
        }

        .sizeguide-divider {
          height: 1px;
          background-color: var(--border-light);
          margin: 12px 0;
        }

        .selected-size-guide {
          margin-bottom: 18px;
          padding: 14px 16px;
          border: 1px solid var(--border-light);
          background-color: #fff8ef;
          border-radius: 6px;
        }

        .selected-size-guide h4 {
          margin: 0 0 10px 0;
          font-size: 1rem;
          color: var(--text-dark);
        }

        .guide-values {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          font-size: 0.92rem;
          color: var(--text-muted);
        }

        .guide-values span {
          display: block;
        }

        .selected-size-message {
          margin-bottom: 18px;
          color: var(--text-muted);
          font-size: 0.92rem;
        }

        .measurements-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .measure-input label {
          display: block;
          font-size: 0.82rem;
          color: var(--text-muted);
          margin-bottom: 6px;
        }

        .measure-input input {
          width: 100%;
          padding: 8px;
          border: 1px solid var(--border-light);
          border-radius: 4px;
        }

        .toggle-switch {
          display: inline-block;
          position: relative;
          width: 44px;
          height: 24px;
        }

        .toggle-switch input { display:none; }

        .toggle-switch .slider {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: #ddd;
          border-radius: 20px;
        }

        .toggle-switch .slider:before {
          content: '';
          position: absolute;
          left: 4px; top: 4px;
          width: 16px; height: 16px;
          background: #fff; border-radius: 50%;
          transition: transform 0.2s;
        }

        .toggle-switch input:checked + .slider { background: var(--primary); }
        .toggle-switch input:checked + .slider:before { transform: translateX(20px); }

        .accordions-container {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--border-light);
        }

        .accordion-item {
          border-bottom: 1px solid var(--border-light);
        }

        .accordion-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 0;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 500;
          color: var(--text-dark);
        }

        .accordion-header:hover {
          color: var(--primary);
        }

        .accordion-content {
          padding: 0 0 20px 0;
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .details-list {
          margin-top: 10px;
          padding-left: 20px;
        }

        .details-list li {
          margin-bottom: 5px;
        }

        .related-section {
          border-top: 1px solid var(--border-light);
          padding-top: 80px;
        }

        /* Reduce image size for recommended pieces */
        .related-section .products-grid .product-card .product-image-wrapper {
          padding-top: 90%; /* slightly less tall */
        }

        .related-section .products-grid .product-card {
          max-width: 220px;
        }
      `}</style>
    </div>
  );
}
