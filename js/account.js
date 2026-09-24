/**
 * MEHRAB PERFUME - CUSTOMER ACCOUNT PAGE LOGIC
 * File: js/account.js
 * 
 * Features:
 * - Requires customer authentication (redirects to auth.html if logged out)
 * - Renders customer profile information (Name, Email, Phone)
 * - Displays Customer Order History
 * - Order cancellation mechanism:
 *     Only if status is "Pending" or "Confirmed"
 *     "Delivered" or "Cancelled" cannot be cancelled
 * - Customer logout
 * - Links to order.html?id=MP-XXXXXXX for complete invoice
 */

document.addEventListener('DOMContentLoaded', () => {
  initAccountPage();
});

let currentUser = null;

function initAccountPage() {
  currentUser = window.MP_AUTH.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'auth.html?redirect=' + encodeURIComponent('account.html');
    return;
  }

  renderUserProfile();
  renderOrderHistory();
  setupAccountListeners();
}

function renderUserProfile() {
  const nameEl = document.getElementById('accUserName');
  const emailEl = document.getElementById('accUserEmail');
  const phoneEl = document.getElementById('accUserPhone');
  const initialEl = document.getElementById('accUserAvatarInitial');

  if (nameEl) nameEl.textContent = currentUser.fullName || 'Valued Fragrance Connoisseur';
  if (emailEl) emailEl.textContent = currentUser.email || '';
  if (phoneEl) phoneEl.textContent = currentUser.phone || 'No phone recorded';

  if (initialEl && currentUser.fullName) {
    initialEl.textContent = currentUser.fullName.charAt(0).toUpperCase();
  }
}

function renderOrderHistory() {
  const container = document.getElementById('orderHistoryContainer');
  const emptyState = document.getElementById('orderHistoryEmpty');
  if (!container) return;

  let allOrders = [];
  try {
    const raw = localStorage.getItem('mp_orders');
    allOrders = raw ? JSON.parse(raw) : [];
  } catch (e) {
    allOrders = [];
  }

  // Filter orders matching current customer's id OR email
  const userOrders = allOrders.filter(o => 
    (currentUser.id && o.userId === currentUser.id) ||
    (currentUser.email && o.email && o.email.toLowerCase() === currentUser.email.toLowerCase())
  );

  if (userOrders.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    container.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = userOrders.map(order => {
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    let statusClass = 'badge-pending';
    if (order.status === 'Confirmed') statusClass = 'badge-confirmed';
    if (order.status === 'Delivered') statusClass = 'badge-delivered';
    if (order.status === 'Cancelled') statusClass = 'badge-cancelled';

    const canCancel = (order.status === 'Pending' || order.status === 'Confirmed');

    return `
      <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: var(--shadow-card);">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 1rem; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text);">Order #</span>
            <span style="font-weight: 700; color: var(--color-gold-light); font-family: monospace; font-size: 1.05rem; margin-left: 0.35rem;">${order.id}</span>
            <span style="margin: 0 0.5rem; color: var(--color-border);">•</span>
            <span style="color: var(--color-gray-text); font-size: 0.85rem;">${orderDate}</span>
          </div>
          <div>
            <span class="badge-status ${statusClass}">${order.status}</span>
          </div>
        </div>

        <!-- Items Preview -->
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem;">
          ${(order.items || []).map(item => `
            <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
              <div style="display: flex; align-items: center; gap: 0.75rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 40px; height: 40px; border-radius: var(--radius-sm); object-fit: cover;">
                <div>
                  <span style="font-weight: 600; color: var(--color-white);">${item.name}</span>
                  <span style="color: var(--color-gold); font-size: 0.8rem; margin-left: 0.5rem;">(${item.size}) × ${item.quantity}</span>
                </div>
              </div>
              <div style="font-weight: 600; color: var(--color-gold-light);">
                ${window.MP_COMMON.formatPrice(item.price * item.quantity)}
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Footer Row with Total & Actions -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--color-border-subtle); padding-top: 1rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <span style="font-size: 0.85rem; color: var(--color-gray-text);">Total Amount: </span>
            <span style="font-size: 1.2rem; font-weight: 700; color: var(--color-gold-light);">${window.MP_COMMON.formatPrice(order.totalAmount)}</span>
          </div>
          <div style="display: flex; gap: 0.75rem;">
            <a href="order.html?id=${order.id}" class="btn btn-outline-gold btn-sm">View Details</a>
            ${canCancel ? `
              <button onclick="promptCancelCustomerOrder('${order.id}')" class="btn btn-danger-outline btn-sm">
                Cancel Order
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let pendingCancelOrderId = null;

function promptCancelCustomerOrder(orderId) {
  pendingCancelOrderId = orderId;
  const modal = document.getElementById('cancelOrderModal');
  const textEl = document.getElementById('cancelModalOrderText');
  if (modal) {
    if (textEl) {
      textEl.textContent = `Are you sure you want to cancel order #${orderId}? This action cannot be reversed.`;
    }
    modal.classList.add('open');
  } else {
    // Direct fallback if modal markup is not present
    executeCancelOrder(orderId);
  }
}

function executeCancelOrder(orderId) {
  if (!orderId) return;

  let allOrders = [];
  try {
    const raw = localStorage.getItem('mp_orders');
    allOrders = raw ? JSON.parse(raw) : [];
  } catch (e) {
    allOrders = [];
  }

  const idx = allOrders.findIndex(o => o.id === orderId);
  if (idx > -1) {
    if (allOrders[idx].status === 'Delivered' || allOrders[idx].status === 'Cancelled') {
      window.MP_COMMON.showToast('This order cannot be cancelled anymore.');
      return;
    }

    allOrders[idx].status = 'Cancelled';
    allOrders[idx].updatedAt = new Date().toISOString();
    localStorage.setItem('mp_orders', JSON.stringify(allOrders));

    window.MP_COMMON.showToast(`Order #${orderId} has been cancelled.`);
    renderOrderHistory();
  }

  closeCancelModal();
}

function closeCancelModal() {
  pendingCancelOrderId = null;
  const modal = document.getElementById('cancelOrderModal');
  if (modal) {
    modal.classList.remove('open');
  }
}

function setupAccountListeners() {
  // Logout handler - immediate and reliable, zero browser blocking
  const logoutBtn = document.getElementById('accLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.MP_AUTH.logoutCustomer();
    });
  }

  // Cancel order modal buttons
  const confirmBtn = document.getElementById('btnConfirmCancelOrder');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (pendingCancelOrderId) {
        executeCancelOrder(pendingCancelOrderId);
      }
    });
  }

  const closeBtn = document.getElementById('btnCloseCancelModal');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeCancelModal();
    });
  }

  const modal = document.getElementById('cancelOrderModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeCancelModal();
      }
    });
  }
}

window.cancelCustomerOrder = promptCancelCustomerOrder;
window.promptCancelCustomerOrder = promptCancelCustomerOrder;
