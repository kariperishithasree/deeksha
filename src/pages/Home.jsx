import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Compass, Heart, Shield } from 'lucide-react';
import heroImg1 from '../assets/nishitha (black pattu).jpeg';
import heroImg2 from '../assets/neelambari(light blue jute).png';
import heroImg3 from '../assets/terracotta_sunrise.png';

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      image: heroImg1,
      tag: "THE INAUGURAL COLLECTION",
      title: "Chanderi Dreams",
      description: "Sheer handloom silk blended with organic cotton, adorned with delicate botanical hand-embroidery.",
      link: "/shop?fabric=Chanderi"
    },
    {
      image: heroImg2,
      tag: "PURE MANGALGIRI COTTON",
      title: "Madhavi Heritage",
      description: "Soft, handwoven Mangalgiri cotton in a rich maroon tone with refined tailoring for heritage elegance.",
      link: "/shop?fabric=Pure%20Mangalgiri%20Cotton"
    },
    {
      image: heroImg3,
      tag: "ORGANIC INDIGO EDITS",
      title: "Deep Indigo Meadows",
      description: "Naturally dyed in Rajasthan, featuring white sashiko thread work and practical pockets.",
      link: "/shop?fabric=Cotton"
    },
    {
      image: heroImg3,
      tag: "FLAX LINEN DRESSES",
      title: "Terracotta Sunrise",
      description: "Puff sleeve silhouettes in heritage flax linen, embroidered with vibrant wildflower vines.",
      link: "/shop?fabric=Linen"
    }
  ];

  // Auto carousel slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Carousel */}
      <section className="hero-slider">
        {slides.map((slide, idx) => (
          <div 
            key={idx} 
            className={`hero-slide ${idx === activeSlide ? 'active' : ''}`}
          >
            <div className="slide-image-wrapper">
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay"></div>
            </div>
            
            <div className="container slide-content-container">
              <div className="slide-content animate-fade-in-up">
                <span className="slide-tag">{slide.tag}</span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-description">{slide.description}</p>
                <Link to={slide.link} className="btn btn-primary slide-btn">
                  Explore Frocks <ArrowRight size={16} style={{ marginLeft: '10px' }} />
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel indicators */}
        <div className="carousel-indicators">
          {slides.map((_, idx) => (
            <button 
              key={idx} 
              className={`indicator-dot ${idx === activeSlide ? 'active' : ''}`}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </section>

      {/* Core Brand Pillars */}
      <section className="section pillars-section">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-card">
              <Compass className="pillar-icon" />
              <h3>Everyday Indian Wear</h3>
              <p>Redefining Indian ethnic wear for everyday comfort, confidence, and effortless elegance.</p>
            </div>
            <div className="pillar-card">
              <Heart className="pillar-icon" />
              <h3>Crafted by Indian Artisans</h3>
              <p>Every Deeksha piece celebrates the skill, heritage, and dedication of India's talented artisans.</p>
            </div>
            <div className="pillar-card">
              <Shield className="pillar-icon" />
              <h3>Thoughtfully Made</h3>
              <p>Natural fabrics, minimal plastic, and thoughtfully repurposed fabric ensure every piece is made with care.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Spotlight */}
      <section className="section categories-spotlight">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-subtitle">DESIGNED FOR COMFORT</span>
            <h2 className="section-title">Shop By Length</h2>
          </div>
          <div className="categories-grid">
            <Link to="/shop?length=Mini" className="category-block">
              <div className="cat-img-holder">
                <img src={heroImg3} alt="Mini Dresses" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-info">
                <h3>Mini Dresses</h3>
                <span>View Collection</span>
              </div>
            </Link>

            <Link to="/shop?length=Midi" className="category-block">
              <div className="cat-img-holder">
                <img src={heroImg1} alt="Midi Dresses" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-info">
                <h3>Midi Dresses</h3>
                <span>View Collection</span>
              </div>
            </Link>

            <Link to="/shop?length=Maxi" className="category-block">
              <div className="cat-img-holder">
                <img src={products[3].image} alt="Maxi Dresses" />
                <div className="cat-overlay"></div>
              </div>
              <div className="cat-info">
                <h3>Maxi Dresses</h3>
                <span>View Collection</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Best Sellers Showcase */}
      <section className="section best-sellers">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-subtitle">THE MOST LOVED PIECES</span>
              <h2 className="section-title">Best Sellers</h2>
            </div>
            <Link to="/shop" className="btn-text">View All Pieces</Link>
          </div>

          <div className="products-grid">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Artisan Story Split Screen */}
      <section className="artisan-story-section">
        <div className="story-split-grid">
          <div className="story-image-col">
            <img src={products[5].image} alt="Craftsmanship detail" />
          </div>
          <div className="story-content-col">
            <div className="story-content-box">
              <span className="story-tag">OUR CRAFT</span>
              <h2>Devoted to the Loom and the Needle</h2>
              <p>
                At Deeksha, we believe that garments should tell a story. Not one of speed, but of dedication. 
                Our journey starts at the looms, where weavers spent days hand-weaving cotton and silk threads. 
                Then, it passes to our embroidery artisans, who translate sketches of Indian wildflowers into delicate patterns using the simple needle.
              </p>
              <p className="highlight-para">
                "We don't mass produce. We initiate creation slowly, dedicating hours to each tier and stitch."
              </p>
              <Link to="/about" className="btn btn-secondary mt-20">
                Discover Our Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        /* Hero Slider styling */
        .hero-slider {
          height: 82vh;
          width: 100%;
          position: relative;
          background-color: var(--black);
          overflow: hidden;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          visibility: hidden;
          transition: opacity 1.2s ease, visibility 1.2s ease;
          display: flex;
          align-items: center;
        }

        .hero-slide.active {
          opacity: 1;
          visibility: visible;
        }

        .slide-image-wrapper {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .slide-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .slide-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.45) 40%, rgba(0, 0, 0, 0.15) 100%);
          z-index: 2;
        }

        .slide-content-container {
          position: relative;
          z-index: 3;
        }

        .slide-content {
          max-width: 600px;
          color: var(--white);
        }

        .slide-tag {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          margin-bottom: 15px;
          display: block;
          color: var(--bg-secondary);
        }

        .slide-title {
          font-size: 3.5rem;
          font-weight: 400;
          margin-bottom: 20px;
          line-height: 1.1;
        }

        @media (max-width: 768px) {
          .slide-title {
            font-size: 2.2rem;
          }
          .hero-slider {
            height: 70vh;
          }
        }

        .slide-description {
          font-size: 1.05rem;
          margin-bottom: 35px;
          opacity: 0.9;
          font-family: var(--font-sans);
          line-height: 1.6;
        }

        .slide-btn {
          padding: 15px 35px;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 30px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 10;
        }

        .indicator-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
        }

        .indicator-dot.active {
          background-color: var(--white);
          transform: scale(1.3);
        }

        /* Pillars Section styling */
        .pillars-section {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
        }

        .pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 768px) {
          .pillars-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        .pillar-card {
          text-align: center;
          padding: 10px;
        }

        .pillar-icon {
          color: var(--primary);
          margin-bottom: 20px;
          stroke-width: 1.2px;
          width: 32px;
          height: 32px;
        }

        .pillar-card h3 {
          font-size: 1.25rem;
          font-weight: 500;
          margin-bottom: 12px;
          color: var(--text-dark);
        }

        .pillar-card p {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Section Utility Headers */
        .section-header {
          margin-bottom: 50px;
        }

        .section-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 50px;
        }

        .text-center {
          text-align: center;
        }

        .section-subtitle {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--primary);
          margin-bottom: 10px;
          display: block;
        }

        .section-title {
          font-size: 2.2rem;
          font-weight: 400;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 1.7rem;
          }
          .section-header-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }
        }

        /* Categories Spotlight Grid */
        .categories-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 768px) {
          .categories-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .category-block {
          position: relative;
          display: block;
          overflow: hidden;
        }

        .cat-img-holder {
          position: relative;
          padding-top: 135%;
          overflow: hidden;
          background-color: var(--bg-secondary);
        }

        .cat-img-holder img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cat-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.15);
          transition: background-color 0.4s ease;
        }

        .category-block:hover .cat-img-holder img {
          transform: scale(1.06);
        }

        .category-block:hover .cat-overlay {
          background-color: rgba(0,0,0,0.3);
        }

        .cat-info {
          position: absolute;
          bottom: 30px;
          left: 30px;
          color: var(--white);
          z-index: 10;
        }

        .cat-info h3 {
          font-size: 1.45rem;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .cat-info span {
          font-size: 0.78rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: underline;
        }

        /* Products Grid */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 992px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .products-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        /* Artisan Story split screen */
        .artisan-story-section {
          width: 100%;
          border-top: 1px solid var(--border-light);
        }

        .story-split-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          min-height: 550px;
        }

        @media (max-width: 992px) {
          .story-split-grid {
            grid-template-columns: 1fr;
          }
          .story-image-col {
            height: 350px;
          }
        }

        .story-image-col img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-content-col {
          background-color: var(--bg-secondary);
          display: flex;
          align-items: center;
          padding: 80px 10%;
        }

        @media (max-width: 576px) {
          .story-content-col {
            padding: 40px 20px;
          }
        }

        .story-content-box {
          max-width: 500px;
        }

        .story-tag {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: var(--primary);
          margin-bottom: 12px;
          display: block;
        }

        .story-content-box h2 {
          font-size: 2.2rem;
          font-weight: 400;
          margin-bottom: 20px;
          color: var(--text-dark);
        }

        .story-content-box p {
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .highlight-para {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--primary) !important;
          border-left: 2px solid var(--primary);
          padding-left: 20px;
          font-size: 1.05rem !important;
          margin: 30px 0 !important;
        }
      `}</style>
    </div>
  );
}
