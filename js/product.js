/**
 * MEHRAB PERFUME - PRODUCT DETAILS PAGE LOGIC
 * File: js/product.js
 * 
 * Features:
 * - Reads product id from URL query (?id=mp-oud-01)
 * - 3 PRODUCT IMAGE SYSTEM:
 *     - Displays 3 thumbnails and 1 large main image
 *     - Clicking any thumbnail switches the large view
 * - Size switcher (6ml, 12ml, 15ml) that dynamically updates displayed price
 * - Quantity increment / decrement
 * - 3 Action buttons:
 *     1. ORDER THIS PERFUME -> Adds item and redirects straight to checkout.html
 *     2. ADD TO CART -> Adds item to cart, triggers toast & updates navbar badge
 *     3. ORDER VIA WHATSAPP -> Formats order text and opens wa.me link
 * - Related Fragrances recommendations
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductDetails();
});

let currentProduct = null;
let selectedSize = '12ml';
let selectedQuantity = 1;
let currentActiveImageIndex = 0;

function initProductDetails() {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id') || 'mp-oud-01';

  currentProduct = window.MP_COMMON.getProductById(productId);

  if (!currentProduct) {
    renderNotFound();
    return;
  }

  // Set document title
  document.title = `${currentProduct.name} - MEHRAB PERFUME`;

  renderBreadcrumb();
  renderGallery();
  renderProductInfo();
  renderRelatedProducts();
  setupInteractions();
}

function renderNotFound() {
  const container = document.getElementById('productDetailsContainer');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 5rem 1rem;">
        <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--color-white);">Perfume Not Found</h2>
        <p style="color: var(--color-gray-text); margin-bottom: 2rem;">The requested fragrance could not be located in our catalog.</p>
        <a href="shop.html" class="btn btn-gold">Explore All Fragrances</a>
      </div>
    `;
  }
}

// 1. RENDER BREADCRUMB
function renderBreadcrumb() {
  const breadcrumb = document.getElementById('productBreadcrumb');
  if (!breadcrumb) return;

  breadcrumb.innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-separator">/</span>
    <a href="shop.html">Shop</a>
    <span class="breadcrumb-separator">/</span>
    <a href="shop.html?category=${encodeURIComponent(currentProduct.category)}">${currentProduct.category}</a>
    <span class="breadcrumb-separator">/</span>
    <span style="color: var(--color-gold);">${currentProduct.name}</span>
  `;
}

// 2. 3 PRODUCT IMAGE GALLERY SYSTEM
function renderGallery() {
  const mainImageContainer = document.getElementById('mainImageWrapper');
  const thumbsContainer = document.getElementById('galleryThumbsWrapper');
  if (!mainImageContainer || !thumbsContainer) return;

  // Ensure up to 3 images exist with fallbacks
  const defaultImages = [
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=800&q=80'
  ];

  let images = currentProduct.images && currentProduct.images.length > 0 ? currentProduct.images : defaultImages;
  
  // Guarantee up to 3 images
  if (images.length === 1) images = [images[0], defaultImages[1], defaultImages[2]];
  if (images.length === 2) images = [images[0], images[1], defaultImages[2]];
  images = images.slice(0, 3); // Max 3 images

  // Render main large image
  mainImageContainer.innerHTML = `
    <img id="largeMainImage" src="${images[0]}" alt="${currentProduct.name}" style="width: 100%; height: 100%; object-fit: cover;">
  `;

  // Render 3 thumbnails
  thumbsContainer.innerHTML = images.map((imgUrl, index) => `
    <div class="gallery-thumb ${index === 0 ? 'active' : ''}" data-index="${index}">
      <img src="${imgUrl}" alt="${currentProduct.name} View ${index + 1}">
    </div>
  `).join('');

  // Attach thumbnail click handlers
  const thumbElements = thumbsContainer.querySelectorAll('.gallery-thumb');
  thumbElements.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const idx = parseInt(thumb.getAttribute('data-index'), 10);
      currentActiveImageIndex = idx;
      
      // Update active thumb styling
      thumbElements.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      // Update main large image with smooth fade
      const largeImg = document.getElementById('largeMainImage');
      if (largeImg) {
        largeImg.style.opacity = '0.3';
        largeImg.style.transition = 'opacity 0.2s ease';
        setTimeout(() => {
          largeImg.src = images[idx];
          largeImg.style.opacity = '1';
        }, 150);
      }
    });
  });
}

// 3. RENDER PRODUCT DETAILS & PRICING
function renderProductInfo() {
  const categoryEl = document.getElementById('productCategory');
  const nameEl = document.getElementById('productName');
  const ratingEl = document.getElementById('productRating');
  const descEl = document.getElementById('productDescription');
  const priceDisplay = document.getElementById('activePriceDisplay');
  const badgeEl = document.getElementById('productBadge');

  if (categoryEl) categoryEl.textContent = currentProduct.category;
  if (nameEl) nameEl.textContent = currentProduct.name;
  if (descEl) descEl.textContent = currentProduct.description;

  if (badgeEl) {
    if (currentProduct.badge) {
      badgeEl.textContent = currentProduct.badge;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  if (ratingEl) {
    ratingEl.innerHTML = `
      <span>★</span>
      <span style="font-weight: 700;">${currentProduct.rating || '4.9'}</span>
      <span class="product-reviews-count">(${currentProduct.reviewsCount || 120} Customer Reviews)</span>
      <span style="margin: 0 0.5rem; color: var(--color-border);">|</span>
      <span style="color: #4CAF50; font-weight: 600;">✓ In Stock</span>
    `;
  }

  // Update Size Pills with their prices
  const btn6ml = document.getElementById('btnSize6ml');
  const btn12ml = document.getElementById('btnSize12ml');
  const btn15ml = document.getElementById('btnSize15ml');

  if (btn6ml) {
    btn6ml.querySelector('.size-price').textContent = window.MP_COMMON.formatPrice(currentProduct.price6ml);
  }
  if (btn12ml) {
    btn12ml.querySelector('.size-price').textContent = window.MP_COMMON.formatPrice(currentProduct.price12ml);
  }
  if (btn15ml) {
    btn15ml.querySelector('.size-price').textContent = window.MP_COMMON.formatPrice(currentProduct.price15ml);
  }

  updatePrice();
}

function updatePrice() {
  const priceDisplay = document.getElementById('activePriceDisplay');
  const sizeLabel = document.getElementById('activeSizeLabel');

  let price = currentProduct.price12ml;
  if (selectedSize === '6ml') price = currentProduct.price6ml;
  if (selectedSize === '15ml') price = currentProduct.price15ml;

  if (priceDisplay) {
    priceDisplay.textContent = window.MP_COMMON.formatPrice(price);
  }
  if (sizeLabel) {
    sizeLabel.textContent = `Selected size: ${selectedSize} bottle`;
  }
}

// 4. SETUP BUTTON INTERACTIONS
function setupInteractions() {
  // Size buttons toggle
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.getAttribute('data-size');
      updatePrice();
    });
  });

  // Quantity control
  const minusBtn = document.getElementById('qtyMinusBtn');
  const plusBtn = document.getElementById('qtyPlusBtn');
  const qtyInput = document.getElementById('qtyInput');

  if (minusBtn && plusBtn && qtyInput) {
    minusBtn.addEventListener('click', () => {
      if (selectedQuantity > 1) {
        selectedQuantity--;
        qtyInput.value = selectedQuantity;
      }
    });

    plusBtn.addEventListener('click', () => {
      if (selectedQuantity < 20) {
        selectedQuantity++;
        qtyInput.value = selectedQuantity;
      }
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 20) val = 20;
      selectedQuantity = val;
      qtyInput.value = val;
    });
  }

  // 1. ADD TO CART BUTTON
  const addToCartBtn = document.getElementById('btnAddToCart');
  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      window.MP_COMMON.addToCart(currentProduct, selectedSize, selectedQuantity);
    });
  }

  // 2. ORDER THIS PERFUME BUTTON (BUY NOW / CHECKOUT DIRECTLY)
  const orderNowBtn = document.getElementById('btnOrderNow');
  if (orderNowBtn) {
    orderNowBtn.addEventListener('click', () => {
      window.MP_COMMON.addToCart(currentProduct, selectedSize, selectedQuantity);
      window.location.href = 'checkout.html';
    });
  }

  // 3. ORDER VIA WHATSAPP BUTTON
  const whatsappBtn = document.getElementById('btnOrderWhatsApp');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', () => {
      const url = window.MP_COMMON.createSingleProductWhatsAppUrl(currentProduct, selectedSize, selectedQuantity);
      window.open(url, '_blank');
    });
  }
}

// 5. RELATED PRODUCTS
function renderRelatedProducts() {
  const container = document.getElementById('relatedProductsGrid');
  if (!container) return;

  const all = window.MP_COMMON.getStoreProducts();
  const related = all
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id && p.isActive !== false)
    .slice(0, 4);

  if (related.length === 0) {
    const section = document.getElementById('relatedSection');
    if (section) section.style.display = 'none';
    return;
  }

  container.innerHTML = related.map(p => {
    const img = (p.images && p.images[0]) || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=600&q=80';
    return `
      <div class="product-card" data-id="${p.id}">
        <a href="product.html?id=${p.id}" class="product-thumb-wrap">
          <img src="${img}" alt="${p.name}" class="product-thumb" loading="lazy">
        </a>
        <div class="product-card-body">
          <div class="product-category">${p.category}</div>
          <h3 class="product-name">
            <a href="product.html?id=${p.id}">${p.name}</a>
          </h3>
          <div class="product-price-row">
            <div>
              <div class="product-price-label">12ml bottle</div>
              <div class="product-price-main">${window.MP_COMMON.formatPrice(p.price12ml)}</div>
            </div>
          </div>
          <div class="product-card-actions" style="grid-template-columns: 1fr;">
            <a href="product.html?id=${p.id}" class="btn btn-outline-gold btn-sm">View Perfume</a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
