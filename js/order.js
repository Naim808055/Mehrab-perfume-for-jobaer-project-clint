/**
 * MEHRAB PERFUME - ORDER CONFIRMATION & RECEIPT PAGE LOGIC
 * File: js/order.js
 * 
 * Features:
 * - Parses ?id=MP-XXXXXXX from URL
 * - Renders complete order details & invoice receipt
 * - One-click WhatsApp order confirmation link
 * - Direct Cancel Order action (if status is Pending/Confirmed)
 */

document.addEventListener('DOMContentLoaded', () => {
  initOrderReceipt();
});

let currentOrder = null;

function initOrderReceipt() {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get('id');

  if (!orderId) {
    renderMissingOrder();
    return;
  }

  let allOrders = [];
  try {
    const raw = localStorage.getItem('mp_orders');
    allOrders = raw ? JSON.parse(raw) : [];
  } catch (e) {
    allOrders = [];
  }

  currentOrder = allOrders.find(o => o.id === orderId);

  if (!currentOrder) {
    renderMissingOrder();
    return;
  }

  renderOrderDetails();
}

function renderMissingOrder() {
  const container = document.getElementById('orderReceiptContainer');
  if (container) {
    container.innerHTML = `
      <div style="text-align: center; padding: 5rem 1rem;">
        <h2 style="font-size: 2rem; color: var(--color-white); margin-bottom: 1rem;">Order Not Found</h2>
        <p style="color: var(--color-gray-text); margin-bottom: 2rem;">No matching order was found with this identifier.</p>
        <a href="shop.html" class="btn btn-gold">Explore Perfumes</a>
      </div>
    `;
  }
}

function renderOrderDetails() {
  const container = document.getElementById('orderReceiptContainer');
  if (!container) return;

  const orderDate = new Date(currentOrder.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Status badge styling
  let statusBadgeClass = 'badge-pending';
  if (currentOrder.status === 'Confirmed') statusBadgeClass = 'badge-confirmed';
  if (currentOrder.status === 'Delivered') statusBadgeClass = 'badge-delivered';
  if (currentOrder.status === 'Cancelled') statusBadgeClass = 'badge-cancelled';

  const isCancellable = (currentOrder.status === 'Pending' || currentOrder.status === 'Confirmed');

  container.innerHTML = `
    <div style="background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 2.5rem; max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-card);">
      
      <!-- Top banner -->
      <div style="text-align: center; margin-bottom: 2.5rem; border-bottom: 1px solid var(--color-border); padding-bottom: 1.5rem;">
        <div style="width: 64px; height: 64px; background: rgba(217, 174, 82, 0.15); border: 2px solid var(--color-gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: var(--color-gold);">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h1 style="font-size: 2rem; color: var(--color-white); margin-bottom: 0.5rem;">Thank You For Your Order!</h1>
        <p style="color: var(--color-gray-text);">Your order has been recorded. Our team will verify and prepare your artisanal perfumes.</p>
      </div>

      <!-- Order Meta Grid -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 1.5rem; background: #071017; padding: 1.25rem; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); margin-bottom: 2rem;">
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text);">Order ID</div>
          <div style="font-size: 1.1rem; font-weight: 700; color: var(--color-gold-light); font-family: monospace;">${currentOrder.id}</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text);">Date & Time</div>
          <div style="font-size: 0.95rem; color: var(--color-cream);">${orderDate}</div>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text);">Status</div>
          <div><span class="badge-status ${statusBadgeClass}">${currentOrder.status}</span></div>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-gray-text);">Payment</div>
          <div style="font-size: 0.95rem; color: var(--color-cream);">${currentOrder.paymentMethod || 'Cash on Delivery'}</div>
        </div>
      </div>

      <!-- Customer & Shipping Information -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">
        <div>
          <h3 style="font-size: 1rem; color: var(--color-gold); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Recipient Info</h3>
          <p style="color: var(--color-white); font-weight: 600;">${currentOrder.customerName}</p>
          <p style="color: var(--color-gray-text); font-size: 0.9rem;">Phone: ${currentOrder.phone}</p>
          <p style="color: var(--color-gray-text); font-size: 0.9rem;">Email: ${currentOrder.email}</p>
        </div>
        <div>
          <h3 style="font-size: 1rem; color: var(--color-gold); margin-bottom: 0.75rem; text-transform: uppercase; letter-spacing: 0.08em;">Delivery Address</h3>
          <p style="color: var(--color-gray-text); font-size: 0.9rem; line-height: 1.5;">${currentOrder.address}</p>
        </div>
      </div>

      <!-- Items Table -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-size: 1.1rem; color: var(--color-white); margin-bottom: 1rem;">Ordered Fragrances</h3>
        <div style="border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden;">
          ${currentOrder.items.map(item => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--color-border-subtle); background: #0b141e;">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: var(--radius-sm); object-fit: cover;">
                <div>
                  <div style="font-weight: 600; color: var(--color-white);">${item.name}</div>
                  <div style="font-size: 0.8rem; color: var(--color-gold);">Size: ${item.size} × ${item.quantity}</div>
                </div>
              </div>
              <div style="font-weight: 700; color: var(--color-gold-light);">
                ${window.MP_COMMON.formatPrice(item.price * item.quantity)}
              </div>
            </div>
          `).join('')}
          
          <!-- Pricing Summary rows -->
          <div style="padding: 1.25rem; background: #071017;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--color-gray-text);">
              <span>Subtotal:</span>
              <span>${window.MP_COMMON.formatPrice(currentOrder.subtotal || (currentOrder.totalAmount - (currentOrder.shippingFee || 0)))}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-size: 0.9rem; color: var(--color-gray-text);">
              <span>Shipping Fee:</span>
              <span>${(currentOrder.shippingFee === 0 || !currentOrder.shippingFee) ? 'FREE' : window.MP_COMMON.formatPrice(currentOrder.shippingFee)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 1.25rem; font-weight: 700; color: var(--color-gold-light); border-top: 1px solid var(--color-border-subtle); padding-top: 0.75rem;">
              <span>Grand Total:</span>
              <span>${window.MP_COMMON.formatPrice(currentOrder.totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <button id="btnOrderReceiptWhatsApp" class="btn btn-whatsapp btn-block">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.007c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
          Confirm / Track This Order on WhatsApp
        </button>

        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="account.html" class="btn btn-outline-gold" style="flex: 1;">View My Account Orders</a>
          <a href="shop.html" class="btn btn-dark" style="flex: 1;">Continue Shopping</a>
          ${isCancellable ? `<button id="btnCancelThisOrder" class="btn btn-danger-outline" style="flex: 1;">Cancel Order</button>` : ''}
        </div>
      </div>
    </div>
  `;

  // WhatsApp click handler
  const waBtn = document.getElementById('btnOrderReceiptWhatsApp');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      let msg = `Salam MEHRAB PERFUME!\n\nHere is my Order Details:\n• Order ID: ${currentOrder.id}\n• Customer: ${currentOrder.customerName}\n• Phone: ${currentOrder.phone}\n• Address: ${currentOrder.address}\n\nItems:`;
      currentOrder.items.forEach(it => {
        msg += `\n- ${it.name} (${it.size}) × ${it.quantity} = ৳${it.price * it.quantity}`;
      });
      msg += `\n\nTotal: ৳${currentOrder.totalAmount}\nPayment: ${currentOrder.paymentMethod}\nStatus: ${currentOrder.status}\n\nPlease confirm processing!`;
      
      const url = window.MP_COMMON.generateWhatsAppUrl(msg);
      window.open(url, '_blank');
    });
  }

  // Cancel order handler
  const cancelBtn = document.getElementById('btnCancelThisOrder');
  const modal = document.getElementById('cancelOrderReceiptModal');
  const confirmBtn = document.getElementById('btnConfirmCancelReceipt');
  const closeBtn = document.getElementById('btnCloseCancelReceiptModal');
  const modalText = document.getElementById('cancelOrderReceiptModalText');

  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (modal) {
        if (modalText) {
          modalText.textContent = `Are you sure you want to cancel order #${currentOrder.id}? This cannot be undone.`;
        }
        modal.classList.add('open');
      } else {
        cancelCurrentOrder();
      }
    });
  }

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      if (modal) modal.classList.remove('open');
      cancelCurrentOrder();
    };
  }

  if (closeBtn) {
    closeBtn.onclick = () => {
      if (modal) modal.classList.remove('open');
    };
  }

  if (modal) {
    modal.onclick = (e) => {
      if (e.target === modal) modal.classList.remove('open');
    };
  }
}

function cancelCurrentOrder() {
  let allOrders = [];
  try {
    const raw = localStorage.getItem('mp_orders');
    allOrders = raw ? JSON.parse(raw) : [];
  } catch (e) {
    allOrders = [];
  }

  const idx = allOrders.findIndex(o => o.id === currentOrder.id);
  if (idx > -1) {
    allOrders[idx].status = 'Cancelled';
    allOrders[idx].updatedAt = new Date().toISOString();
    localStorage.setItem('mp_orders', JSON.stringify(allOrders));
    currentOrder.status = 'Cancelled';
    window.MP_COMMON.showToast(`Order #${currentOrder.id} has been cancelled.`);
    renderOrderDetails();
  }
}
