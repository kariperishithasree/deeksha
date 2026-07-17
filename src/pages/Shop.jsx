import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

export default function Shop() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // States for filters
  const [selectedLength, setSelectedLength] = useState('');
  const [selectedFabric, setSelectedFabric] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleFabricChange = (fab) => {
    const nextFabric = selectedFabric === fab ? '' : fab;
    setSelectedFabric(nextFabric);
    setSelectedCategory('');

    const params = new URLSearchParams(location.search);
    params.delete('category');

    if (nextFabric) {
      params.set('fabric', nextFabric);
    } else {
      params.delete('fabric');
    }

    const searchString = params.toString();
    navigate(`${location.pathname}${searchString ? `?${searchString}` : ''}`, { replace: true });
  };
  const [sortOption, setSortOption] = useState('featured');
  const [searchFilter, setSearchFilter] = useState('');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Parse URL search parameters on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lengthParam = params.get('length') || '';
    const fabricParam = params.get('fabric') || '';
    const searchParam = params.get('search') || '';
    const filterParam = params.get('filter') || '';
    const categoryParam = params.get('category') || '';
    const sizeParam = params.get('size') || '';

    setSelectedLength(lengthParam);
    setSelectedFabric(fabricParam.trim());
    setSelectedSize(sizeParam);
    setSearchFilter(searchParam);
    setSelectedCategory(categoryParam.trim());

    if (filterParam === 'isBestSeller') {
      setSortOption('bestselling');
    } else {
      setSortOption('featured');
    }
  }, [location.search]);

  // Reset all filters
  const handleClearAll = () => {
    setSelectedLength('');
    setSelectedFabric('');
    setSelectedSize('');
    setSearchFilter('');
    setSelectedCategory('');
    setSortOption('featured');
    navigate(location.pathname, { replace: true });
  };

  // Filter and sort product list
  const filteredProducts = products
    .filter((product) => {
      if (selectedCategory) {
        const normalizedCategory = selectedCategory.toLowerCase();
        const productCategory = (product.category || '').toLowerCase();
        if (productCategory !== normalizedCategory) return false;
      }
      // Filter by length
      if (selectedLength && product.length !== selectedLength) return false;
      // Filter by Fabric
      if (selectedFabric) {
        const normalizedProductFabric = product.fabric.toLowerCase();
        const normalizedSelectedFabric = selectedFabric.toLowerCase();
        if (normalizedSelectedFabric === 'pure mangalgiri cotton') {
          if (normalizedProductFabric !== 'pure mangalgiri cotton') return false;
        } else if (normalizedSelectedFabric === 'cotton') {
          if (normalizedProductFabric === 'pure mangalgiri cotton') return false;
          if (!normalizedProductFabric.includes('cotton')) return false;
        } else {
          if (!normalizedProductFabric.includes(normalizedSelectedFabric)) return false;
        }
      }
      // Filter by Size availability
      if (selectedSize && !product.sizes.includes(selectedSize)) return false;
      // Filter by Search Query
      if (searchFilter) {
        const query = searchFilter.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        if (!matchesName && !matchesFabric && !matchesDesc) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return a.price - b.price;
      if (sortOption === 'price-high') return b.price - a.price;
      if (sortOption === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOption === 'bestselling') return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      return 0; // featured/default
    });

  return (
    <div className="shop-page animate-fade-in">
      {/* Category banner header */}
      <div className="shop-header">
        <div className="container">
          <h1>Women's Handcrafted Pieces</h1>
          <p>Each piece is initiated on manual looms and finished with delicate embroidery needlework.</p>
        </div>
      </div>

      <div className="container">
        {/* Toolbar */}
        <div className="shop-toolbar">
          <button 
            className="filter-toggle-btn" 
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={16} style={{ marginRight: '8px' }} />
            Filters
          </button>
          
          <div className="toolbar-count">
            Showing {filteredProducts.length} of {products.length} pieces
          </div>

          <div className="sort-dropdown-container">
            <label htmlFor="sort-select">Sort By</label>
            <div className="select-wrapper">
              <select 
                id="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="bestselling">Best Selling</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name-asc">Alphabetical: A-Z</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
          </div>
        </div>

        {/* Catalog Main Layout */}
        <div className="shop-layout">
          {/* Sidebar Filter Panel - Desktop */}
          <aside className="shop-sidebar">
            {/* Length Filter */}
            <div className="filter-group">
              <h3>Length</h3>
              <div className="filter-options">
                {['Mini', 'Midi', 'Maxi'].map((len) => (
                  <button 
                    key={len}
                    className={`filter-btn ${selectedLength === len ? 'active' : ''}`}
                    onClick={() => setSelectedLength(selectedLength === len ? '' : len)}
                  >
                    {len}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div className="filter-group">
              <h3>Fabric & Weave</h3>
              <div className="filter-options">
                {['Chanderi', 'Pure Mangalgiri Cotton', 'Jute', 'Linen', 'Cotton'].map((fab) => (
                  <button 
                    key={fab}
                    className={`filter-btn ${selectedFabric === fab ? 'active' : ''}`}
                    onClick={() => handleFabricChange(fab)}
                  >
                    {fab}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Filter */}
            <div className="filter-group">
              <h3>Available Sizes</h3>
              <div className="filter-sizes-grid">
                {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                  <button 
                    key={sz}
                    className={`size-filter-btn ${selectedSize === sz ? 'active' : ''}`}
                    onClick={() => setSelectedSize(selectedSize === sz ? '' : sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters list / Clear button */}
            {(selectedLength || selectedFabric || selectedSize || searchFilter) && (
              <button className="btn btn-secondary clear-all-btn" onClick={handleClearAll}>
                Clear All Filters
              </button>
            )}
          </aside>

          {/* Product Grid Area */}
          <main className="shop-main-content">
            {filteredProducts.length === 0 ? (
              <div className="no-results-view">
                <h3>No pieces found</h3>
                <p>Try modifying your size or fabric filters to find available styles.</p>
                <button className="btn btn-primary mt-15" onClick={handleClearAll}>
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="shop-products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer Filters */}
      {isMobileFiltersOpen && (
        <div className="mobile-filters-overlay animate-fade-in" onClick={() => setIsMobileFiltersOpen(false)}>
          <div className="mobile-filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filters-header">
              <h2>Filter Collection</h2>
              <button className="close-filters-btn" onClick={() => setIsMobileFiltersOpen(false)}>
                <X size={22} />
              </button>
            </div>
            
            <div className="mobile-filters-content">
              {/* Length */}
              <div className="m-filter-section">
                <h4>Length</h4>
                <div className="m-options">
                  {['Mini', 'Midi', 'Maxi'].map((len) => (
                    <button 
                      key={len}
                      className={`filter-btn ${selectedLength === len ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedLength(selectedLength === len ? '' : len);
                      }}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fabric */}
              <div className="m-filter-section">
                <h4>Fabric & Weave</h4>
                <div className="m-options">
                  {['Chanderi', 'Pure Mangalgiri Cotton', 'Jute', 'Linen', 'Cotton'].map((fab) => (
                    <button 
                      key={fab}
                      className={`filter-btn ${selectedFabric === fab ? 'active' : ''}`}
                      onClick={() => {
                        handleFabricChange(fab);
                      }}
                    >
                      {fab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="m-filter-section">
                <h4>Sizes</h4>
                <div className="m-sizes-grid">
                  {['XS', 'S', 'M', 'L', 'XL'].map((sz) => (
                    <button 
                      key={sz}
                      className={`size-filter-btn ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedSize(selectedSize === sz ? '' : sz);
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mobile-filters-footer">
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  handleClearAll();
                  setIsMobileFiltersOpen(false);
                }}
              >
                Clear All
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .shop-header {
          background-color: var(--bg-secondary);
          padding: 60px 0;
          text-align: center;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 40px;
        }

        .shop-header h1 {
          font-size: 2.4rem;
          font-weight: 400;
          color: var(--text-dark);
          margin-bottom: 10px;
        }

        .shop-header p {
          color: var(--text-muted);
          font-size: 0.95rem;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Toolbar styling */
        .shop-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 30px;
        }

        .filter-toggle-btn {
          display: none;
          align-items: center;
          font-size: 0.9rem;
          font-weight: 500;
          border: 1px solid var(--border-light);
          padding: 8px 16px;
          background-color: var(--white);
        }

        @media (max-width: 992px) {
          .filter-toggle-btn {
            display: flex;
          }
          .shop-sidebar {
            display: none !important;
          }
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
        }

        .toolbar-count {
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        .sort-dropdown-container {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .sort-dropdown-container label {
          font-size: 0.85rem;
          color: var(--text-light);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .select-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .select-wrapper select {
          padding: 8px 30px 8px 12px;
          font-size: 0.9rem;
          color: var(--text-dark);
          border: 1px solid var(--border-light);
          background-color: var(--white);
          appearance: none;
          border-radius: 0;
          cursor: pointer;
        }

        .select-chevron {
          position: absolute;
          right: 10px;
          color: var(--text-muted);
          pointer-events: none;
        }

        /* Shop Layout styling */
        .shop-layout {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 50px;
          margin-bottom: 80px;
        }

        .shop-sidebar {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        .filter-group h3 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-dark);
          margin-bottom: 15px;
          font-weight: 600;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-start;
        }

        .filter-btn {
          font-size: 0.92rem;
          color: var(--text-muted);
          text-align: left;
          padding: 4px 0;
          position: relative;
        }

        .filter-btn:hover {
          color: var(--primary);
        }

        .filter-btn.active {
          color: var(--primary);
          font-weight: 600;
        }

        .filter-sizes-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }

        .size-filter-btn {
          width: 38px;
          height: 38px;
          border: 1px solid var(--border-light);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-dark);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .size-filter-btn:hover {
          border-color: var(--text-dark);
        }

        .size-filter-btn.active {
          background-color: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }

        .clear-all-btn {
          width: 100%;
          font-size: 0.8rem;
          padding: 10px 0;
        }

        /* Products Display */
        .shop-products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        @media (max-width: 1200px) {
          .shop-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
        }

        @media (max-width: 576px) {
          .shop-products-grid {
            grid-template-columns: 1fr;
            gap: 25px;
          }
        }

        .no-results-view {
          text-align: center;
          padding: 80px 0;
        }

        .no-results-view h3 {
          font-size: 1.3rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .no-results-view p {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        /* Mobile Filters Drawer */
        .mobile-filters-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0,0,0,0.3);
          backdrop-filter: blur(4px);
          z-index: 1000;
        }

        .mobile-filters-drawer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 85%;
          max-width: 380px;
          background-color: var(--bg-primary);
          display: flex;
          flex-direction: column;
          box-shadow: var(--shadow-lg);
          animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mobile-filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid var(--border-light);
        }

        .mobile-filters-header h2 {
          font-size: 1.2rem;
          font-weight: 500;
        }

        .close-filters-btn {
          color: var(--text-dark);
        }

        .mobile-filters-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .m-filter-section h4 {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-dark);
          margin-bottom: 12px;
          font-weight: 600;
        }

        .m-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: flex-start;
        }

        .m-sizes-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .mobile-filters-footer {
          padding: 20px;
          border-top: 1px solid var(--border-light);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
      `}</style>
    </div>
  );
}
