/**
 * MEHRAB PERFUME - ADMIN DASHBOARD LOGIC
 * File: js/admin.js
 * 
 * Fully Featured Administrative Operations:
 * 1. Authentication Gate (Strictly requires Admin session)
 * 2. Real-time Metrics (Total Orders, Revenue, Catalog size, Pending orders)
 * 3. Orders Management (Status updater, search, view receipt modal, delete)
 * 4. Products Management (3 Images upload/URL, 6ml/12ml/15ml pricing, add/edit/delete/toggle)
 * 5. Combo Offers System (Offer ON / Offer OFF live switch)
 * 6. Customer Directory
 * 7. Store Settings
 */

// 1. STRICT AUTH CHECK
if (!window.MP_AUTH.requireAdminAuth()) {
  throw new Error('Unauthorized');
}

let adminCurrentTab = 'orders';
let editingProductId = null;
let editingComboId = null;

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

function initAdminDashboard() {
  setupSidebarNavigation();
  refreshStats();
  renderOrdersTable();
  renderProductsTable();
  renderCombosTable();
  renderCustomersTable();
  setupProductForm();
  setupComboForm();
  setupSettingsForm();
  setupImageUploadHandlers();

  // Admin Logout Handler
  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.MP_AUTH.logoutAdmin();
    });
  }
}

// 2. SIDEBAR TABS SWITCHING
function setupSidebarNavigation() {
  const navItems = document.querySelectorAll('.admin-nav-item[data-tab]');
  const sections = document.querySelectorAll('.admin-tab-section');

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = item.getAttribute('data-tab');
      
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');

      sections.forEach(sec => {
        sec.style.display = sec.id === `section-${targetTab}` ? 'block' : 'none';
      });

      adminCurrentTab = targetTab;

      // Close mobile sidebar if open
      const sidebar = document.querySelector('.admin-sidebar');
      if (sidebar) sidebar.classList.remove('open');
    });
  });

  // Mobile sidebar hamburger toggle
  const adminMobileToggle = document.getElementById('adminMobileToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (adminMobileToggle && sidebar) {
    adminMobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }
}

// 3. STATS RECALCULATION
function refreshStats() {
  const orders = getAdminOrders();
  const products = window.MP_COMMON.getStoreProducts();

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  
  // Calculate revenue from non-cancelled orders
  const revenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  const statOrdersEl = document.getElementById('statTotalOrders');
  const statRevenueEl = document.getElementById('statTotalRevenue');
  const statProductsEl = document.getElementById('statTotalProducts');
  const statPendingEl = document.getElementById('statPendingOrders');

  if (statOrdersEl) statOrdersEl.textContent = totalOrders;
  if (statRevenueEl) statRevenueEl.textContent = window.MP_COMMON.formatPrice(revenue);
  if (statProductsEl) statProductsEl.textContent = products.length;
  if (statPendingEl) statPendingEl.textContent = pendingOrders;
}

// ==========================================
// 4. ORDERS MANAGEMENT
// ==========================================
function getAdminOrders() {
  try {
    const raw = localStorage.getItem('mp_orders');
    return raw ? JSON.parse(raw) : (window.INITIAL_ORDERS || []);
  } catch (e) {
    return window.INITIAL_ORDERS || [];
  }
}

function saveAdminOrders(orders) {
  localStorage.setItem('mp_orders', JSON.stringify(orders));
  refreshStats();
}

function renderOrdersTable() {
  const tbody = document.getElementById('adminOrdersTableBody');
  const filterStatus = document.getElementById('adminOrderFilterStatus')?.value || 'all';
  const searchTerm = (document.getElementById('adminOrderSearchInput')?.value || '').toLowerCase().trim();
  if (!tbody) return;

  let orders = getAdminOrders();

  if (filterStatus !== 'all') {
    orders = orders.filter(o => o.status === filterStatus);
  }

  if (searchTerm) {
    orders = orders.filter(o => 
      o.id.toLowerCase().includes(searchTerm) ||
      o.customerName.toLowerCase().includes(searchTerm) ||
      (o.phone && o.phone.includes(searchTerm))
    );
  }

  if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-gray-text); padding: 2rem;">No orders match criteria</td></tr>`;
    return;
  }

  tbody.innerHTML = orders.map(order => {
    const dateStr = new Date(order.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    return `
      <tr>
        <td style="font-family: monospace; font-weight: 700; color: var(--color-gold-light);">${order.id}</td>
        <td>
          <div style="font-weight: 600; color: var(--color-white);">${order.customerName}</div>
          <div style="font-size: 0.8rem; color: var(--color-gray-text);">${order.phone}</div>
        </td>
        <td style="font-size: 0.85rem; color: var(--color-cream);">${dateStr}</td>
        <td style="font-size: 0.85rem;">
          ${(order.items || []).map(i => `${i.name} (${i.size}) × ${i.quantity}`).join('<br>')}
        </td>
        <td style="font-weight: 700; color: var(--color-gold);">${window.MP_COMMON.formatPrice(order.totalAmount)}</td>
        <td>
          <select class="form-control" style="padding: 0.35rem 0.6rem; font-size: 0.8rem; width: auto;" onchange="changeOrderStatus('${order.id}', this.value)">
            <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Confirmed" ${order.status === 'Confirmed' ? 'selected' : ''}>Confirmed</option>
            <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
          </select>
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline-gold btn-sm" onclick="viewOrderModal('${order.id}')">View</button>
            <button class="btn btn-sm" style="border: 1px solid #f44336; color: #f44336;" onclick="deleteOrder('${order.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function changeOrderStatus(orderId, newStatus) {
  const orders = getAdminOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    order.updatedAt = new Date().toISOString();
    saveAdminOrders(orders);
    window.MP_COMMON.showToast(`Order ${orderId} marked as ${newStatus}`);
    renderOrdersTable();
  }
}

function deleteOrder(orderId) {
  let orders = getAdminOrders();
  orders = orders.filter(o => o.id !== orderId);
  saveAdminOrders(orders);
  window.MP_COMMON.showToast(`Order ${orderId} deleted.`);
  renderOrdersTable();
  refreshStats();
}

function viewOrderModal(orderId) {
  const orders = getAdminOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  const modal = document.getElementById('adminOrderModal');
  const body = document.getElementById('adminOrderModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1rem;">
      <div>
        <h3 style="color: var(--color-gold); font-size: 1.25rem;">Order: ${order.id}</h3>
        <p style="font-size: 0.85rem; color: var(--color-gray-text);">Placed: ${new Date(order.createdAt).toLocaleString()}</p>
      </div>
      <div>
        <span class="badge-status badge-${order.status.toLowerCase()}">${order.status}</span>
      </div>
    </div>

    <div style="margin-bottom: 1.5rem;">
      <h4 style="font-size: 0.95rem; color: var(--color-cream); margin-bottom: 0.5rem; text-transform: uppercase;">Customer Details</h4>
      <p><strong>Name:</strong> ${order.customerName}</p>
      <p><strong>Email:</strong> ${order.email || 'N/A'}</p>
      <p><strong>Phone:</strong> ${order.phone}</p>
      <p><strong>Address:</strong> ${order.address}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod || 'Cash on Delivery'}</p>
    </div>

    <div>
      <h4 style="font-size: 0.95rem; color: var(--color-cream); margin-bottom: 0.5rem; text-transform: uppercase;">Ordered Items</h4>
      <div style="border: 1px solid var(--color-border-subtle); border-radius: var(--radius-sm); overflow: hidden;">
        ${order.items.map(it => `
          <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--color-border-subtle); font-size: 0.9rem;">
            <span>${it.name} (${it.size}) × ${it.quantity}</span>
            <span style="font-weight: 700; color: var(--color-gold);">${window.MP_COMMON.formatPrice(it.price * it.quantity)}</span>
          </div>
        `).join('')}
        <div style="padding: 1rem; background: #060d14; font-weight: 700; display: flex; justify-content: space-between; font-size: 1.1rem; color: var(--color-gold-light);">
          <span>Total:</span>
          <span>${window.MP_COMMON.formatPrice(order.totalAmount)}</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('open');
}

function closeOrderModal() {
  const modal = document.getElementById('adminOrderModal');
  if (modal) modal.classList.remove('open');
}

// ==========================================
// 5. PRODUCTS MANAGEMENT (3 IMAGES SYSTEM)
// ==========================================
function renderProductsTable() {
  const tbody = document.getElementById('adminProductsTableBody');
  const searchInput = (document.getElementById('adminProductSearchInput')?.value || '').toLowerCase().trim();
  if (!tbody) return;

  let products = window.MP_COMMON.getStoreProducts();

  if (searchInput) {
    products = products.filter(p => 
      p.name.toLowerCase().includes(searchInput) ||
      p.category.toLowerCase().includes(searchInput)
    );
  }

  tbody.innerHTML = products.map(prod => {
    const mainImg = (prod.images && prod.images[0]) || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=400&q=80';
    const isActive = prod.isActive !== false;

    return `
      <tr>
        <td>
          <img src="${mainImg}" alt="${prod.name}" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover; border: 1px solid var(--color-border);">
        </td>
        <td>
          <div style="font-weight: 600; color: var(--color-white);">${prod.name}</div>
          <div style="font-size: 0.75rem; color: var(--color-gold);">${prod.badge || ''}</div>
        </td>
        <td>${prod.category}</td>
        <td style="font-size: 0.85rem;">
          6ml: <strong>${window.MP_COMMON.formatPrice(prod.price6ml)}</strong><br>
          12ml: <strong>${window.MP_COMMON.formatPrice(prod.price12ml)}</strong><br>
          15ml: <strong>${window.MP_COMMON.formatPrice(prod.price15ml)}</strong>
        </td>
        <td>
          <button class="btn btn-sm ${isActive ? 'btn-outline-gold' : 'btn-dark'}" onclick="toggleProductActive('${prod.id}')" style="font-size: 0.75rem;">
            ${isActive ? 'Active (Live)' : 'Hidden (Draft)'}
          </button>
        </td>
        <td>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline-gold btn-sm" onclick="openEditProductModal('${prod.id}')">Edit</button>
            <button class="btn btn-sm" style="border: 1px solid #f44336; color: #f44336;" onclick="deleteProduct('${prod.id}')">Delete</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleProductActive(productId) {
  let products = window.MP_COMMON.getStoreProducts();
  const prod = products.find(p => p.id === productId);
  if (prod) {
    prod.isActive = prod.isActive === false ? true : false;
    localStorage.setItem('mp_products', JSON.stringify(products));
    window.MP_COMMON.showToast(`${prod.name} is now ${prod.isActive ? 'Active' : 'Hidden'}`);
    renderProductsTable();
  }
}

function deleteProduct(productId) {
  let products = window.MP_COMMON.getStoreProducts();
  products = products.filter(p => p.id !== productId);
  localStorage.setItem('mp_products', JSON.stringify(products));
  window.MP_COMMON.showToast('Product removed from catalog.');
  renderProductsTable();
  refreshStats();
}

function openAddProductModal() {
  editingProductId = null;
  document.getElementById('productModalTitle').textContent = 'Add New Artisanal Perfume';
  document.getElementById('productForm').reset();
  
  // Reset previews
  [1, 2, 3].forEach(idx => {
    hideProductImagePreview(idx);
    const textInput = document.getElementById(`prodImg${idx}`);
    if (textInput) textInput.value = '';
  });

  // Provide initial luxury perfume sample for Image 1
  const defaultImg1 = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80';
  document.getElementById('prodImg1').value = defaultImg1;
  updateProductImagePreview(1, defaultImg1, 'Default Luxury Flacon (URL)');

  document.getElementById('adminProductModal').classList.add('open');
}

function openEditProductModal(productId) {
  editingProductId = productId;
  const products = window.MP_COMMON.getStoreProducts();
  const p = products.find(x => x.id === productId);
  if (!p) return;

  document.getElementById('productModalTitle').textContent = `Edit Perfume: ${p.name}`;
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodBadge').value = p.badge || 'None';
  document.getElementById('prodPrice6ml').value = p.price6ml;
  document.getElementById('prodPrice12ml').value = p.price12ml;
  document.getElementById('prodPrice15ml').value = p.price15ml;
  document.getElementById('prodDesc').value = p.description;

  [1, 2, 3].forEach((num, idx) => {
    const val = (p.images && p.images[idx]) || '';
    const textInput = document.getElementById(`prodImg${num}`);
    if (textInput) textInput.value = val;
    if (val) {
      updateProductImagePreview(num, val, `Image ${num}`);
    } else {
      hideProductImagePreview(num);
    }
  });

  document.getElementById('adminProductModal').classList.add('open');
}

function closeProductModal() {
  document.getElementById('adminProductModal').classList.remove('open');
  [1, 2, 3].forEach(idx => hideProductImagePreview(idx));
  editingProductId = null;
}

function setupProductForm() {
  const form = document.getElementById('productForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('prodName').value.trim();
    const category = document.getElementById('prodCategory').value;
    const badge = document.getElementById('prodBadge').value === 'None' ? null : document.getElementById('prodBadge').value;
    const price6ml = parseInt(document.getElementById('prodPrice6ml').value, 10);
    const price12ml = parseInt(document.getElementById('prodPrice12ml').value, 10);
    const price15ml = parseInt(document.getElementById('prodPrice15ml').value, 10);
    const description = document.getElementById('prodDesc').value.trim();

    // Collect 3 images
    const img1 = document.getElementById('prodImg1').value.trim();
    const img2 = document.getElementById('prodImg2').value.trim();
    const img3 = document.getElementById('prodImg3').value.trim();

    const images = [img1, img2, img3].filter(img => Boolean(img));

    let products = window.MP_COMMON.getStoreProducts();

    if (editingProductId) {
      const idx = products.findIndex(p => p.id === editingProductId);
      if (idx > -1) {
        products[idx] = {
          ...products[idx],
          name,
          category,
          badge,
          price6ml,
          price12ml,
          price15ml,
          description,
          images: images.length ? images : products[idx].images,
          updatedAt: new Date().toISOString()
        };
        window.MP_COMMON.showToast(`Updated ${name}`);
      }
    } else {
      const newProduct = {
        id: 'mp-' + category.toLowerCase() + '-' + Date.now(),
        name,
        category,
        badge,
        price6ml,
        price12ml,
        price15ml,
        description,
        rating: 5.0,
        reviewsCount: 1,
        images: images.length ? images : ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80'],
        isActive: true,
        createdAt: new Date().toISOString()
      };
      products.unshift(newProduct);
      window.MP_COMMON.showToast(`Created new product ${name}`);
    }

    localStorage.setItem('mp_products', JSON.stringify(products));
    closeProductModal();
    renderProductsTable();
    refreshStats();
  });
}

// ==========================================
// 6. COMBO PACKS MANAGEMENT (OFFER ON / OFFER OFF)
// ==========================================
function renderCombosTable() {
  const container = document.getElementById('adminCombosList');
  if (!container) return;

  const combos = window.MP_COMMON.getStoreCombos();

  container.innerHTML = combos.map(combo => {
    const isOfferOn = combo.isActive === true;
    return `
      <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; display: flex; gap: 1.5rem; align-items: center; justify-content: space-between; flex-wrap: wrap;">
        <div style="display: flex; gap: 1.25rem; align-items: center;">
          <img src="${combo.image}" alt="${combo.title}" style="width: 80px; height: 80px; border-radius: var(--radius-md); object-fit: cover; border: 1px solid var(--color-border);">
          <div>
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gold); font-weight: 700;">${combo.eyebrow || 'OFFER'}</div>
            <h4 style="font-size: 1.15rem; color: var(--color-white);">${combo.title}</h4>
            <div style="font-size: 0.85rem; color: var(--color-gray-text); max-width: 450px;">${combo.description}</div>
            <div style="font-size: 0.9rem; color: var(--color-gold-light); font-weight: 700; margin-top: 0.35rem;">${combo.metaLabel || 'Value'}: ${combo.metaValue || 'Special'}</div>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem;">
          <!-- CRITICAL: Live Offer ON / OFF Toggle -->
          <div style="text-align: center;">
            <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text); margin-bottom: 0.3rem;">Public Status</div>
            <button class="btn btn-sm ${isOfferOn ? 'btn-gold' : 'btn-dark'}" onclick="toggleComboOffer('${combo.id}')" style="min-width: 110px;">
              ${isOfferOn ? '● OFFER ON' : '○ OFFER OFF'}
            </button>
          </div>
          
          <button class="btn btn-outline-gold btn-sm" onclick="openEditComboModal('${combo.id}')">Edit</button>
          <button class="btn btn-sm" style="border: 1px solid #f44336; color: #f44336;" onclick="deleteCombo('${combo.id}')">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function toggleComboOffer(comboId) {
  let combos = window.MP_COMMON.getStoreCombos();
  const c = combos.find(x => x.id === comboId);
  if (c) {
    c.isActive = !c.isActive;
    localStorage.setItem('mp_combos', JSON.stringify(combos));
    window.MP_COMMON.showToast(`${c.title} is now ${c.isActive ? 'OFFER ON (Visible on Home)' : 'OFFER OFF (Hidden from Home)'}`);
    renderCombosTable();
  }
}

function deleteCombo(comboId) {
  let combos = window.MP_COMMON.getStoreCombos();
  combos = combos.filter(c => c.id !== comboId);
  localStorage.setItem('mp_combos', JSON.stringify(combos));
  window.MP_COMMON.showToast('Combo offer deleted.');
  renderCombosTable();
}

function openAddComboModal() {
  editingComboId = null;
  document.getElementById('comboModalTitle').textContent = 'Create New Combo Offer';
  document.getElementById('comboForm').reset();
  hideComboImagePreview();
  const defaultComboImg = 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=800&q=80';
  document.getElementById('comboImage').value = defaultComboImg;
  updateComboImagePreview(defaultComboImg, 'Default Combo Set (URL)');
  document.getElementById('adminComboModal').classList.add('open');
}

function openEditComboModal(comboId) {
  editingComboId = comboId;
  const combos = window.MP_COMMON.getStoreCombos();
  const c = combos.find(x => x.id === comboId);
  if (!c) return;

  document.getElementById('comboModalTitle').textContent = `Edit Combo: ${c.title}`;
  document.getElementById('comboTitle').value = c.title;
  document.getElementById('comboEyebrow').value = c.eyebrow || '';
  document.getElementById('comboImage').value = c.image;
  if (c.image) {
    updateComboImagePreview(c.image, 'Current Combo Image');
  } else {
    hideComboImagePreview();
  }
  document.getElementById('comboDesc').value = c.description;
  document.getElementById('comboMetaLabel').value = c.metaLabel || '';
  document.getElementById('comboMetaValue').value = c.metaValue || '';
  document.getElementById('comboStatusSelect').value = c.isActive ? 'true' : 'false';

  document.getElementById('adminComboModal').classList.add('open');
}

function closeComboModal() {
  document.getElementById('adminComboModal').classList.remove('open');
  hideComboImagePreview();
  editingComboId = null;
}

function setupComboForm() {
  const form = document.getElementById('comboForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('comboTitle').value.trim();
    const eyebrow = document.getElementById('comboEyebrow').value.trim();
    const image = document.getElementById('comboImage').value.trim();
    const description = document.getElementById('comboDesc').value.trim();
    const metaLabel = document.getElementById('comboMetaLabel').value.trim();
    const metaValue = document.getElementById('comboMetaValue').value.trim();
    const isActive = document.getElementById('comboStatusSelect').value === 'true';

    let combos = window.MP_COMMON.getStoreCombos();

    if (editingComboId) {
      const idx = combos.findIndex(c => c.id === editingComboId);
      if (idx > -1) {
        combos[idx] = {
          ...combos[idx],
          title,
          eyebrow,
          image,
          description,
          metaLabel,
          metaValue,
          isActive
        };
        window.MP_COMMON.showToast(`Updated ${title}`);
      }
    } else {
      combos.push({
        id: 'combo-' + Date.now(),
        title,
        eyebrow: eyebrow || 'COMBO OFFER',
        image,
        description,
        metaLabel: metaLabel || 'Special Price',
        metaValue: metaValue || '৳1,890',
        badge: 'LIMITED SET',
        isActive: isActive
      });
      window.MP_COMMON.showToast(`Added combo ${title}`);
    }

    localStorage.setItem('mp_combos', JSON.stringify(combos));
    closeComboModal();
    renderCombosTable();
  });
}

// ==========================================
// 7. CUSTOMERS MANAGEMENT
// ==========================================
function renderCustomersTable() {
  const tbody = document.getElementById('adminCustomersTableBody');
  if (!tbody) return;

  const customers = window.MP_AUTH.getRegisteredCustomers();
  const orders = getAdminOrders();

  tbody.innerHTML = customers.map(cust => {
    const custOrders = orders.filter(o => o.userId === cust.id || (o.email && o.email.toLowerCase() === cust.email.toLowerCase()));
    const totalSpent = custOrders.filter(o => o.status !== 'Cancelled').reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return `
      <tr>
        <td style="font-weight: 600; color: var(--color-white);">${cust.fullName}</td>
        <td>${cust.email}</td>
        <td>${cust.phone || 'N/A'}</td>
        <td><span class="badge-status badge-confirmed">${custOrders.length} Orders</span></td>
        <td style="font-weight: 700; color: var(--color-gold-light);">${window.MP_COMMON.formatPrice(totalSpent)}</td>
        <td style="font-size: 0.85rem; color: var(--color-gray-text);">
          ${new Date(cust.createdAt || Date.now()).toLocaleDateString('en-GB')}
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// 8. STORE SETTINGS
// ==========================================
function setupSettingsForm() {
  const form = document.getElementById('adminSettingsForm');
  if (!form) return;

  // Load current values
  const cfg = window.STORE_CONFIG || {};
  if (document.getElementById('settingWhatsApp')) document.getElementById('settingWhatsApp').value = cfg.whatsappNumber || '01938199254';
  if (document.getElementById('settingEmail')) document.getElementById('settingEmail').value = cfg.email || 'mehrab140822@gmail.com';
  if (document.getElementById('settingLocation')) document.getElementById('settingLocation').value = cfg.location || 'Uttara sector 3 takwa masjid fast gate, Dhaka, Bangladesh, 1230';
  if (document.getElementById('settingFacebook')) document.getElementById('settingFacebook').value = cfg.facebookUrl || 'https://www.facebook.com/share/1DG9Jf4tPr/';

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const updated = {
      ...cfg,
      whatsappNumber: document.getElementById('settingWhatsApp').value.trim(),
      email: document.getElementById('settingEmail').value.trim(),
      location: document.getElementById('settingLocation').value.trim(),
      facebookUrl: document.getElementById('settingFacebook').value.trim()
    };
    window.STORE_CONFIG = updated;
    localStorage.setItem('mp_store_config', JSON.stringify(updated));
    window.MP_COMMON.showToast('Store settings saved successfully!');
  });
}

// ==========================================
// 9. DEVICE STORAGE IMAGE UPLOADER & PREVIEW
// ==========================================
function compressAndReadImage(file, callback) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      const maxDim = 900;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      callback(dataUrl, file.name);
    };
    img.onerror = function() {
      callback(e.target.result, file.name);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function setupImageUploadHandlers() {
  // Product image 1, 2, 3
  [1, 2, 3].forEach(idx => {
    const fileInput = document.getElementById(`prodImgFile${idx}`);
    const textInput = document.getElementById(`prodImg${idx}`);
    
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
          compressAndReadImage(file, (dataUrl, fileName) => {
            if (textInput) textInput.value = dataUrl;
            updateProductImagePreview(idx, dataUrl, fileName || `Device Image ${idx}`);
            window.MP_COMMON.showToast(`Image ${idx} loaded from device`);
          });
        }
      });
    }

    if (textInput) {
      textInput.addEventListener('input', (e) => {
        const val = e.target.value.trim();
        if (val) {
          updateProductImagePreview(idx, val, 'URL Linked');
        } else {
          hideProductImagePreview(idx);
        }
      });
    }
  });

  // Combo Image
  const comboFileInput = document.getElementById('comboImgFile');
  const comboTextInput = document.getElementById('comboImage');
  if (comboFileInput) {
    comboFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        compressAndReadImage(file, (dataUrl, fileName) => {
          if (comboTextInput) comboTextInput.value = dataUrl;
          updateComboImagePreview(dataUrl, fileName || 'Device Image');
          window.MP_COMMON.showToast('Combo image loaded from device');
        });
      }
    });
  }
  if (comboTextInput) {
    comboTextInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        updateComboImagePreview(val, 'URL Linked');
      } else {
        hideComboImagePreview();
      }
    });
  }

  // Mobile sidebar menu toggle
  const mobileToggle = document.getElementById('adminMobileToggle');
  const sidebar = document.querySelector('.admin-sidebar');
  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && e.target !== mobileToggle) {
        sidebar.classList.remove('open');
      }
    });
  }
}

function updateProductImagePreview(idx, src, infoText = 'Image Selected') {
  const wrap = document.getElementById(`prodImgPreview${idx}Wrap`);
  const img = document.getElementById(`prodImgPreview${idx}`);
  const info = document.getElementById(`prodImgInfo${idx}`);
  if (wrap && img) {
    img.src = src;
    if (info) info.textContent = infoText;
    wrap.style.display = 'flex';
  }
}

function hideProductImagePreview(idx) {
  const wrap = document.getElementById(`prodImgPreview${idx}Wrap`);
  const img = document.getElementById(`prodImgPreview${idx}`);
  if (wrap) wrap.style.display = 'none';
  if (img) img.src = '';
  const fileInput = document.getElementById(`prodImgFile${idx}`);
  if (fileInput) fileInput.value = '';
}

function clearProductImage(idx) {
  const textInput = document.getElementById(`prodImg${idx}`);
  if (textInput) textInput.value = '';
  hideProductImagePreview(idx);
}

function updateComboImagePreview(src, infoText = 'Image Selected') {
  const wrap = document.getElementById('comboImgPreviewWrap');
  const img = document.getElementById('comboImgPreview');
  const info = document.getElementById('comboImgInfo');
  if (wrap && img) {
    img.src = src;
    if (info) info.textContent = infoText;
    wrap.style.display = 'flex';
  }
}

function hideComboImagePreview() {
  const wrap = document.getElementById('comboImgPreviewWrap');
  const img = document.getElementById('comboImgPreview');
  if (wrap) wrap.style.display = 'none';
  if (img) img.src = '';
  const fileInput = document.getElementById('comboImgFile');
  if (fileInput) fileInput.value = '';
}

function clearComboImage() {
  const textInput = document.getElementById('comboImage');
  if (textInput) textInput.value = '';
  hideComboImagePreview();
}

// Global hooks for inline action buttons
window.changeOrderStatus = changeOrderStatus;
window.deleteOrder = deleteOrder;
window.viewOrderModal = viewOrderModal;
window.closeOrderModal = closeOrderModal;
window.toggleProductActive = toggleProductActive;
window.deleteProduct = deleteProduct;
window.openAddProductModal = openAddProductModal;
window.openEditProductModal = openEditProductModal;
window.closeProductModal = closeProductModal;
window.toggleComboOffer = toggleComboOffer;
window.deleteCombo = deleteCombo;
window.openAddComboModal = openAddComboModal;
window.openEditComboModal = openEditComboModal;
window.closeComboModal = closeComboModal;
window.clearProductImage = clearProductImage;
window.clearComboImage = clearComboImage;
