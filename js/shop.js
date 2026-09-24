/**
 * MEHRAB PERFUME - SHOP PAGE LOGIC
 * File: js/shop.js
 * 
 * Features:
 * - Render all ~50 sample products
 * - Category filter tabs (All, Oud, Musk, Floral, Woody)
 * - Live keyword search input
 * - Price / Rating sort filter
 * - URL parameter query parsing (?category=Oud, ?search=...)
 * - Add to Cart actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initShop();
});

let allProducts = [];
let filteredProducts = [];
let activeCategory = 'All';
let activeSort = 'featured';
let searchQuery = '';

function initShop() {
  allProducts = window.MP_COMMON.getStoreProducts().filter(p => p.isActive !== false);

  // Check URL parameters for pre-selected category or search
  const urlParams = new URLSearchParams(window.location.search);
  const paramCategory = urlParams.get('category');
  const paramSearch = urlParams.get('search');

  if (paramCategory) {
    activeCategory = paramCategory;
  }
  if (paramSearch) {
    searchQuery = paramSearch;
    const searchInput = document.getElementById('shopSearchInput');
    if (searchInput) searchInput.value = paramSearch;
  }

  setupEventListeners();
  applyFilters();
}

function setupEventListeners() {
  // Category tabs
  const catButtons = document.querySelectorAll('.cat-filter-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  // Highlight active category tab if selected from URL
  if (activeCategory !== 'All') {
    catButtons.forEach(btn => {
      if (btn.getAttribute('data-category') === activeCategory) {
        catButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    });
  }

  // Search input
  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // Sort dropdown
  const sortSelect = document.getElementById('shopSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      applyFilters();
    });
  }
}

function applyFilters() {
  filteredProducts = allProducts.filter(product => {
    // 1. Category match
    const matchesCategory = (activeCategory === 'All') || (product.category === activeCategory);

    // 2. Search match (name or description)
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery) ||
      product.description.toLowerCase().includes(searchQuery) ||
      product.category.toLowerCase().includes(searchQuery);

    return matchesCategory && matchesSearch;
  });

  // Apply sorting
  if (activeSort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price6ml - b.price6ml);
  } else if (activeSort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price6ml - a.price6ml);
  } else if (activeSort === 'rating') {
    filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  renderProductsGrid();
}

function renderProductsGrid() {
  const container = document.getElementById('shopProductsGrid');
  const countLabel = document.getElementById('productsCountLabel');
  if (!container) return;

  if (countLabel) {
    countLabel.textContent = `Showing ${filteredProducts.length} of ${allProducts.length} fragrances`;
  }

  if (filteredProducts.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: var(--color-white);">No perfumes found</h3>
        <p style="color: var(--color-gray-text); margin-bottom: 1.5rem;">Try adjusting your search terms or selecting another category.</p>
        <button class="btn btn-outline-gold" onclick="resetFilters()">Clear Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredProducts.map(p => {
    const mainImg = (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80';
    const badgeHTML = p.badge ? `<span class="product-badge">${p.badge}</span>` : '';

    return `
      <div class="product-card" data-id="${p.id}">
        ${badgeHTML}
        <a href="product.html?id=${p.id}" class="product-thumb-wrap">
          <img src="${mainImg}" alt="${p.name}" class="product-thumb" loading="lazy">
        </a>
        <div class="product-card-body">
          <div class="product-category">${p.category}</div>
          <h3 class="product-name">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>
          <div class="product-rating">
            <span>★</span>
            <span>${p.rating || '4.9'}</span>
            <span class="product-reviews-count">(${p.reviewsCount || 65})</span>
          </div>
          <div class="product-price-row">
            <div>
              <div class="product-price-label">6ml / 12ml / 15ml</div>
              <div class="product-price-main">${window.MP_COMMON.formatPrice(p.price6ml)}</div>
            </div>
            <div style="text-align: right; font-size: 0.8rem; color: var(--color-gray-text);">
              <div>12ml: ${window.MP_COMMON.formatPrice(p.price12ml)}</div>
            </div>
          </div>
          <div class="product-card-actions">
            <a href="product.html?id=${p.id}" class="btn btn-outline-gold btn-sm">Details</a>
            <button class="btn btn-gold btn-sm quick-add-btn" data-id="${p.id}">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach quick-add events
  const buttons = container.querySelectorAll('.quick-add-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const product = window.MP_COMMON.getProductById(id);
      if (product) {
        window.MP_COMMON.addToCart(product, '12ml', 1);
      }
    });
  });
}

function resetFilters() {
  activeCategory = 'All';
  searchQuery = '';
  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) searchInput.value = '';

  const catButtons = document.querySelectorAll('.cat-filter-btn');
  catButtons.forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-category') === 'All');
  });

  applyFilters();
}

window.resetFilters = resetFilters;
