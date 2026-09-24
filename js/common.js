/**
 * MEHRAB PERFUME - COMMON JAVASCRIPT UTILITIES
 * File: js/common.js
 * 
 * Contains shared helpers across the entire website:
 * - Cart state management (LocalStorage)
 * - Navigation cart counter updates
 * - Customer auth status detection
 * - Mobile hamburger menu drawer
 * - Toast notification banner
 * - WhatsApp URL generators
 * - Price formatter
 */

// 1. PRICE FORMATTER
function formatPrice(amount) {
  const num = Number(amount) || 0;
  return `৳${num.toLocaleString('en-US')}`;
}

// 2. TOAST NOTIFICATIONS
function showToast(message, type = 'success') {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'error') {
    toast.style.borderColor = '#f44336';
  }

  const iconSvg = type === 'error' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f44336" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D9AE52" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// 3. CART SYSTEM (LOCALSTORAGE)
function getCart() {
  try {
    const raw = localStorage.getItem('mp_cart');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading cart:', e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem('mp_cart', JSON.stringify(cart));
    updateNavCartBadge();
  } catch (e) {
    console.error('Error saving cart:', e);
  }
}

/**
 * Add product to cart with duplicate prevention:
 * If the exact same product and size is already present, increases quantity.
 */
function addToCart(product, size = '12ml', quantity = 1) {
  const cart = getCart();
  const qty = parseInt(quantity, 10) || 1;
  
  // Determine price based on selected size
  let price = product.price12ml;
  if (size === '6ml') price = product.price6ml;
  if (size === '15ml') price = product.price15ml;

  // Check if item with identical id AND size exists
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === size);

  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      category: product.category,
      size: size,
      price: price,
      quantity: qty,
      image: (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80'
    });
  }

  saveCart(cart);
  showToast(`Added ${qty} × ${product.name} (${size}) to Cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1);
    saveCart(cart);
    showToast(`Removed ${removed[0].name} from Cart.`);
  }
}

function updateCartQuantity(index, quantity) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const newQty = parseInt(quantity, 10);
    if (newQty <= 0) {
      removeFromCart(index);
    } else {
      cart[index].quantity = newQty;
      saveCart(cart);
    }
  }
}

function clearCart() {
  saveCart([]);
}

function getCartCount() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.quantity || 1), 0);
}

function getCartSubtotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
}

function updateNavCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'flex' : 'none';
  });
}

// 4. GET ALL PRODUCTS (FROM LOCALSTORAGE OR INITIAL DATA)
function getStoreProducts() {
  try {
    const raw = localStorage.getItem('mp_products');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading products:', e);
  }
  return window.INITIAL_PRODUCTS || [];
}

function getProductById(id) {
  const products = getStoreProducts();
  return products.find(p => p.id === id) || null;
}

// 5. GET ALL COMBOS
function getStoreCombos() {
  try {
    const raw = localStorage.getItem('mp_combos');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error reading combos:', e);
  }
  return window.INITIAL_COMBOS || [];
}

// 6. WHATSAPP GENERATOR
function generateWhatsAppUrl(message) {
  const number = (window.STORE_CONFIG && window.STORE_CONFIG.whatsappNumber) || '01938199254';
  const cleanNum = '88' + number.replace(/\D/g, '').replace(/^88/, '');
  return `https://wa.me/${cleanNum}?text=${encodeURIComponent(message)}`;
}

function createSingleProductWhatsAppUrl(product, size = '12ml', qty = 1) {
  let price = product.price12ml;
  if (size === '6ml') price = product.price6ml;
  if (size === '15ml') price = product.price15ml;
  const total = price * qty;

  const msg = `Salam MEHRAB PERFUME!\n\nI want to order:\n• Perfume: ${product.name}\n• Category: ${product.category}\n• Size: ${size}\n• Quantity: ${qty}\n• Total Price: ৳${total}\n\nPlease confirm availability and delivery to my address.`;
  return generateWhatsAppUrl(msg);
}

// 7. MOBILE HAMBURGER MENU INITIALIZATION
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const mobileClose = document.getElementById('mobileNavClose');
  const mobileBackdrop = document.getElementById('mobileNavBackdrop');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      if (mobileBackdrop) mobileBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      mobileDrawer.classList.remove('open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeDrawer);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);
  }
}

// 8. UPDATE NAVIGATION USER LOGIN INDICATOR
function updateNavUserStatus() {
  const user = window.MP_AUTH ? window.MP_AUTH.getCurrentUser() : null;
  const userLinks = document.querySelectorAll('.nav-user-link');
  userLinks.forEach(link => {
    if (user) {
      link.href = 'account.html';
      link.title = `Logged in as ${user.fullName || user.email}`;
      const textSpan = link.querySelector('.nav-user-label');
      if (textSpan) {
        textSpan.textContent = user.fullName ? user.fullName.split(' ')[0] : 'Account';
      }
    } else {
      link.href = 'auth.html';
      link.title = 'Login or Register';
      const textSpan = link.querySelector('.nav-user-label');
      if (textSpan) {
        textSpan.textContent = 'Account';
      }
    }
  });
}

// INITIALIZE ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  updateNavCartBadge();
  updateNavUserStatus();
});

// EXPORT TO GLOBAL SCOPE
window.MP_COMMON = {
  formatPrice,
  showToast,
  getCart,
  saveCart,
  addToCart,
  removeFromCart,
  updateCartQuantity,
  clearCart,
  getCartCount,
  getCartSubtotal,
  updateNavCartBadge,
  getStoreProducts,
  getProductById,
  getStoreCombos,
  generateWhatsAppUrl,
  createSingleProductWhatsAppUrl,
  updateNavUserStatus
};
