import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import storyImg from '../assets/alabaster_eyelet.png';

export default function About() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const element = document.getElementById(location.hash.replace('#', ''));
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location.hash]);

  return (
    <div className="about-page animate-fade-in">
      {/* Editorial Header */}
      <div id="our-story" className="about-header section text-center">
        <div className="container">
          <span className="section-subtitle">OUR STORY</span>
          <h1>Initiated with Devotion</h1>
          <p className="lead-text">
            In Sanskrit, <strong>Deeksha</strong> means a sacred beginning, a promise made with dedication and purpose. That meaning is at the heart of everything we create.
          </p>
          <p className="lead-text">
            We started Deeksha with a simple belief—that Indian ethnic wear should not be reserved for festivals or special occasions. It should be something women reach for every day because it feels as beautiful as it is comfortable. We want every woman to experience the confidence, ease, and joy of wearing Indian clothing as a part of her everyday life.
          </p>
        </div>
      </div>

      {/* Main Split Story */}
      <section className="section story-pillars">
        <div className="container">
          <div id="heritage" className="story-split-item">
            <div className="story-txt">
              <span className="pillar-num">01</span>
              <h2>The Heritage of Craft</h2>
              <p>
                Across India, generations of artisans continue to preserve handcraft traditions that carry the country's rich cultural heritage.
              </p>
              <p>
                By working with skilled craftspeople and embracing thoughtful craftsmanship, we hope to celebrate these traditions and help keep them alive for generations to come.
              </p>
            </div>
            <div className="story-img">
              <img src={storyImg} alt="Weaving loom texture" />
            </div>
          </div>

          <div className="story-split-item reverse">
            <div className="story-txt">
              <span className="pillar-num">02</span>
              <h2>Made with Care</h2>
              <p>
                Every Deeksha creation is made with love, inspired by Indian heritage, and created for women who believe comfort, authenticity, and craftsmanship belong in everyday life.
              </p>
              <p>
                We design each piece to feel effortless to wear, timeless in style, and meaningful in the way it is made.
              </p>
            </div>
            <div className="story-img">
              <img src={productsPlaceholder()} alt="Embroidery detail" />
            </div>
          </div>

          <div className="story-split-item">
            <div className="story-txt">
              <span className="pillar-num">03</span>
              <h2>Fashion with Meaning</h2>
              <p>
                For us, fashion is more than what you wear. It is about feeling connected—to your roots, to the hands that crafted your garment, and to yourself.
              </p>
              <p>
                As a homegrown brand, we are not defined by being the most premium or the most affordable. We are defined by our commitment to creating clothing with honesty, comfort, and care.
              </p>
            </div>
            <div className="story-img">
              <img src={productsPlaceholder2()} alt="Sustainable lifestyle" />
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-header {
          background-color: var(--bg-secondary);
          border-bottom: 1px solid var(--border-light);
        }

        .lead-text {
          font-size: 1.15rem;
          color: var(--text-muted);
          line-height: 1.7;
          max-width: 800px;
          margin: 20px auto 0 auto;
        }

        /* Story Split layouts */
        .story-pillars {
          display: flex;
          flex-direction: column;
          gap: 100px;
        }

        .story-split-item {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .story-split-item.reverse {
          grid-template-columns: 1fr 1.1fr;
        }

        .story-split-item.reverse .story-txt {
          order: 2;
        }

        .story-split-item.reverse .story-img {
          order: 1;
        }

        @media (max-width: 992px) {
          .story-split-item, .story-split-item.reverse {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .story-split-item.reverse .story-txt {
            order: unset;
          }
          .story-split-item.reverse .story-img {
            order: unset;
          }
          .story-pillars {
            gap: 60px;
          }
        }

        .pillar-num {
          font-family: var(--font-serif);
          font-size: 3rem;
          font-weight: 300;
          color: var(--border-dark);
          opacity: 0.3;
          display: block;
          line-height: 1;
          margin-bottom: 10px;
        }

        .story-txt h2 {
          font-size: 2.2rem;
          font-weight: 400;
          color: var(--text-dark);
          margin-bottom: 20px;
        }

        .story-txt p {
          color: var(--text-muted);
          font-size: 0.98rem;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .story-img {
          background-color: var(--bg-secondary);
          overflow: hidden;
          width: 100%;
          padding-top: 110%;
          position: relative;
        }

        .story-img img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}

// Helpers to get fallback product image references dynamically
function productsPlaceholder() {
  return storyImg; 
}
function productsPlaceholder2() {
  return storyImg; 
}
