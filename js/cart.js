/**
 * MEHRAB PERFUME - CART PAGE LOGIC
 * File: js/cart.js
 * 
 * Features:
 * - Render cart items from localStorage
 * - Quantity increment, decrement & direct input
 * - Remove single item
 * - Clear entire cart
 * - Dynamic shipping computation:
 *     - Inside Dhaka: ৳60
 *     - Outside Dhaka: ৳120
 *     - Free shipping on orders over ৳1500
 * - WhatsApp cart checkout button
 * - Proceed to checkout button
 */

let selectedDeliveryZone = 'inside'; // 'inside' or 'outside'

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  setupCartActions();
});

function renderCart() {
  const container = document.getElementById('cartItemsContainer');
  const emptyState = document.getElementById('cartEmptyState');
  const cartContent = document.getElementById('cartContentLayout');
  if (!container) return;

  const cart = window.MP_COMMON.getCart();

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    window.MP_COMMON.updateNavCartBadge();
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (cartContent) cartContent.style.display = 'grid';

  container.innerHTML = cart.map((item, index) => {
    const itemTotal = item.price * (item.quantity || 1);
    return `
      <tr>
        <td>
          <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            <div>
              <div class="cart-item-name"><a href="product.html?id=${item.id}">${item.name}</a></div>
              <div class="cart-item-size">Size: ${item.size}</div>
              <div style="font-size: 0.8rem; color: var(--color-gray-text);">Unit: ${window.MP_COMMON.formatPrice(item.price)}</div>
            </div>
          </div>
        </td>
        <td>
          <div class="quantity-control" style="transform: scale(0.9); transform-origin: left center;">
            <button class="qty-btn" onclick="modifyItemQty(${index}, -1)">−</button>
            <input type="text" class="qty-input" value="${item.quantity || 1}" readonly>
            <button class="qty-btn" onclick="modifyItemQty(${index}, 1)">+</button>
          </div>
        </td>
        <td style="font-weight: 700; color: var(--color-gold-light);">${window.MP_COMMON.formatPrice(itemTotal)}</td>
        <td style="text-align: right;">
          <button onclick="removeItem(${index})" title="Remove item" style="color: #f44336; padding: 0.4rem; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  updateCartSummary();
  window.MP_COMMON.updateNavCartBadge();
}

function updateCartSummary() {
  const cart = window.MP_COMMON.getCart();
  const subtotal = window.MP_COMMON.getCartSubtotal();
  const count = window.MP_COMMON.getCartCount();

  // Shipping calculation
  let shipping = 0;
  if (subtotal >= 1500) {
    shipping = 0;
  } else {
    shipping = selectedDeliveryZone === 'inside' ? 60 : 120;
  }

  const grandTotal = subtotal + shipping;

  const subtotalEl = document.getElementById('summarySubtotal');
  const countEl = document.getElementById('summaryCount');
  const shippingEl = document.getElementById('summaryShipping');
  const grandTotalEl = document.getElementById('summaryGrandTotal');
  const freeNoticeEl = document.getElementById('freeShippingNotice');

  if (subtotalEl) subtotalEl.textContent = window.MP_COMMON.formatPrice(subtotal);
  if (countEl) countEl.textContent = `${count} item${count > 1 ? 's' : ''}`;
  if (shippingEl) {
    shippingEl.textContent = shipping === 0 ? 'FREE (Over ৳1500)' : window.MP_COMMON.formatPrice(shipping);
  }
  if (grandTotalEl) grandTotalEl.textContent = window.MP_COMMON.formatPrice(grandTotal);

  if (freeNoticeEl) {
    if (subtotal >= 1500) {
      freeNoticeEl.innerHTML = `<span style="color: #4CAF50;">🎉 You qualified for FREE Home Delivery!</span>`;
    } else {
      const remaining = 1500 - subtotal;
      freeNoticeEl.innerHTML = `<span>Add <strong>${window.MP_COMMON.formatPrice(remaining)}</strong> more to get <strong>FREE SHIPPING</strong>!</span>`;
    }
  }
}

function modifyItemQty(index, delta) {
  const cart = window.MP_COMMON.getCart();
  if (index >= 0 && index < cart.length) {
    const newQty = (cart[index].quantity || 1) + delta;
    if (newQty <= 0) {
      window.MP_COMMON.removeFromCart(index);
    } else {
      window.MP_COMMON.updateCartQuantity(index, newQty);
    }
    renderCart();
  }
}

function removeItem(index) {
  const cart = window.MP_COMMON.getCart();
  if (index >= 0 && index < cart.length) {
    window.MP_COMMON.removeFromCart(index);
    renderCart();
  }
}

function setupCartActions() {
  // Clear cart button
  const clearBtn = document.getElementById('btnClearCart');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      window.MP_COMMON.clearCart();
      window.MP_COMMON.showToast('Your cart has been cleared.');
      renderCart();
    });
  }

  // Delivery zone selector radios
  const zoneRadios = document.querySelectorAll('input[name="deliveryZone"]');
  zoneRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      selectedDeliveryZone = e.target.value;
      updateCartSummary();
    });
  });

  // WhatsApp order full cart button
  const waCartBtn = document.getElementById('btnWhatsAppCart');
  if (waCartBtn) {
    waCartBtn.addEventListener('click', () => {
      const cart = window.MP_COMMON.getCart();
      if (cart.length === 0) return;

      const subtotal = window.MP_COMMON.getCartSubtotal();
      const shipping = subtotal >= 1500 ? 0 : (selectedDeliveryZone === 'inside' ? 60 : 120);
      const total = subtotal + shipping;

      let msg = `Salam MEHRAB PERFUME!\n\nI want to order the following items from my cart:\n`;
      cart.forEach((item, idx) => {
        msg += `\n${idx + 1}. ${item.name} (${item.size}) × ${item.quantity} = ৳${item.price * item.quantity}`;
      });
      msg += `\n\nSubtotal: ৳${subtotal}`;
      msg += `\nDelivery Area: ${selectedDeliveryZone === 'inside' ? 'Inside Dhaka (৳60)' : 'Outside Dhaka (৳120)'}`;
      msg += `\nEstimated Delivery Fee: ${shipping === 0 ? 'FREE' : '৳' + shipping}`;
      msg += `\nTotal: ৳${total}`;
      msg += `\n\nPlease confirm my order and let me know the delivery timeframe.`;

      const url = window.MP_COMMON.generateWhatsAppUrl(msg);
      window.open(url, '_blank');
    });
  }
}

// Global functions for inline HTML event triggers
window.modifyItemQty = modifyItemQty;
window.removeItem = removeItem;
