/**
 * MEHRAB PERFUME - HOME PAGE LOGIC
 * File: js/home.js
 * 
 * Controls:
 * - Hero carousel slider (auto-play, dots, next/prev)
 * - Dynamic collection counter pills
 * - Weekly Bestsellers rendering
 * - Combo Pack offers (filtered by OFFER ON / OFFER OFF status)
 * - Curated Category Showcases (Oud, Musk, Floral)
 * - Quick Add to Cart actions
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
  renderWeeklyBestsellers();
  renderHomeCombos();
  renderOudShowcase();
  renderMuskShowcase();
  renderFloralShowcase();
  updateCategoryCounters();
});

// 1. HERO SLIDER CONTROLLER
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let timer = null;

  function showSlide(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    currentIndex = index;
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  function prevSlide() {
    const prev = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      resetTimer();
    });
  });

  function startTimer() {
    timer = setInterval(nextSlide, 6000);
  }

  function resetTimer() {
    clearInterval(timer);
    startTimer();
  }

  startTimer();
}

// 2. HELPER TO CREATE PRODUCT CARD HTML
function createProductCardHTML(product) {
  const mainImage = (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80';
  const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';

  return `
    <div class="product-card" data-id="${product.id}">
      ${badgeHTML}
      <a href="product.html?id=${product.id}" class="product-thumb-wrap">
        <img src="${mainImage}" alt="${product.name}" class="product-thumb" loading="lazy">
      </a>
      <div class="product-card-body">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">
          <a href="product.html?id=${product.id}">${product.name}</a>
        </h3>
        <div class="product-rating">
          <span>★</span>
          <span>${product.rating || '4.9'}</span>
          <span class="product-reviews-count">(${product.reviewsCount || 85})</span>
        </div>
        <div class="product-price-row">
          <div>
            <div class="product-price-label">Starting from</div>
            <div class="product-price-main">${window.MP_COMMON.formatPrice(product.price6ml)}</div>
          </div>
          <div style="font-size: 0.8rem; color: var(--color-gray-text); text-align: right;">
            <div>12ml: ${window.MP_COMMON.formatPrice(product.price12ml)}</div>
          </div>
        </div>
        <div class="product-card-actions">
          <a href="product.html?id=${product.id}" class="btn btn-outline-gold btn-sm">View Details</a>
          <button class="btn btn-gold btn-sm quick-add-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </div>
  `;
}

// 3. RENDER WEEKLY BESTSELLERS
function renderWeeklyBestsellers() {
  const container = document.getElementById('bestsellersContainer');
  if (!container) return;

  const products = window.MP_COMMON.getStoreProducts().filter(p => p.isActive !== false);
  // Pick products marked as Bestseller or highest rated
  const bestsellers = products.filter(p => p.badge === 'Bestseller' || p.rating >= 4.9).slice(0, 8);

  container.innerHTML = bestsellers.map(p => createProductCardHTML(p)).join('');
  attachQuickAddHandlers(container);
}

// 4. RENDER COMBO PACK OFFERS (CRITICAL: RESPECTS OFFER ON/OFF)
function renderHomeCombos() {
  const container = document.getElementById('combosContainer');
  if (!container) return;

  const combos = window.MP_COMMON.getStoreCombos();
  // Filter only active / ON offers
  const activeCombos = combos.filter(c => c.isActive === true);

  if (activeCombos.length === 0) {
    // If all offers are turned off by admin, hide the section
    const section = document.getElementById('combosSection');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = activeCombos.map(combo => `
    <div class="combo-card">
      <div class="combo-img-wrap">
        <span class="product-badge">${combo.badge || 'SPECIAL OFFER'}</span>
        <img src="${combo.image}" alt="${combo.title}" class="combo-img" loading="lazy">
      </div>
      <div class="combo-body">
        <div class="combo-eyebrow">${combo.eyebrow || 'LIMITED SET'}</div>
        <h3 class="combo-title">${combo.title}</h3>
        <p class="combo-desc">${combo.description}</p>
        <div class="combo-meta-row">
          <span class="combo-meta-label">${combo.metaLabel || 'Value'}</span>
          <span class="combo-meta-val">${combo.metaValue || 'Special'}</span>
        </div>
        <a href="https://wa.me/8801938199254?text=${encodeURIComponent('Salam MEHRAB PERFUME! I am interested in ordering the combo offer: ' + combo.title + ' (' + (combo.metaValue || '') + '). Please provide details.')}" 
           target="_blank" 
           class="btn btn-gold btn-block">
          ${combo.buttonText || 'Order Combo'}
        </a>
      </div>
    </div>
  `).join('');
}

// 5. RENDER CATEGORY SHOWCASES
function renderOudShowcase() {
  const container = document.getElementById('oudShowcaseContainer');
  if (!container) return;
  const products = window.MP_COMMON.getStoreProducts().filter(p => p.category === 'Oud' && p.isActive !== false).slice(0, 4);
  container.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  attachQuickAddHandlers(container);
}

function renderMuskShowcase() {
  const container = document.getElementById('muskShowcaseContainer');
  if (!container) return;
  const products = window.MP_COMMON.getStoreProducts().filter(p => p.category === 'Musk' && p.isActive !== false).slice(0, 4);
  container.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  attachQuickAddHandlers(container);
}

function renderFloralShowcase() {
  const container = document.getElementById('floralShowcaseContainer');
  if (!container) return;
  const products = window.MP_COMMON.getStoreProducts().filter(p => p.category === 'Floral' && p.isActive !== false).slice(0, 4);
  container.innerHTML = products.map(p => createProductCardHTML(p)).join('');
  attachQuickAddHandlers(container);
}

// 6. UPDATE CATEGORY PILL COUNTS
function updateCategoryCounters() {
  const products = window.MP_COMMON.getStoreProducts();
  const counts = {
    Oud: products.filter(p => p.category === 'Oud').length,
    Musk: products.filter(p => p.category === 'Musk').length,
    Floral: products.filter(p => p.category === 'Floral').length,
    Woody: products.filter(p => p.category === 'Woody').length
  };

  for (const [cat, count] of Object.entries(counts)) {
    const el = document.getElementById(`count-${cat.toLowerCase()}`);
    if (el) el.textContent = `${count} Scents`;
  }
}

// 7. ATTACH QUICK ADD LISTENERS
function attachQuickAddHandlers(container) {
  const buttons = container.querySelectorAll('.quick-add-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      const product = window.MP_COMMON.getProductById(id);
      if (product) {
        // Default quick add is standard 12ml bottle
        window.MP_COMMON.addToCart(product, '12ml', 1);
      }
    });
  });
}
