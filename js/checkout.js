/**
 * MEHRAB PERFUME - CHECKOUT PROCESS LOGIC
 * File: js/checkout.js
 * 
 * Requirements:
 * - Requires customer authentication (redirects to auth.html?redirect=checkout.html if not logged in)
 * - Pre-fills customer name, email, phone from logged-in session
 * - Renders live order summary from cart
 * - Collects address, district/city, payment method (Cash on Delivery or Online Payment)
 * - Generates unique Order ID (e.g., MP-8392104)
 * - Saves order to localStorage & Firestore database
 * - Clears cart upon successful submission
 * - Redirects to order.html?id=MP-8392104 confirmation page
 */

document.addEventListener('DOMContentLoaded', () => {
  initCheckout();
});

let currentUser = null;
let deliveryArea = 'inside'; // 'inside' = 60, 'outside' = 120

function initCheckout() {
  // 1. Enforce Customer Login Requirement
  currentUser = window.MP_AUTH.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'auth.html?redirect=' + encodeURIComponent('checkout.html');
    return;
  }

  // 2. Validate Cart is not empty
  const cart = window.MP_COMMON.getCart();
  if (cart.length === 0) {
    alert('Your cart is empty. Please add items to checkout.');
    window.location.href = 'shop.html';
    return;
  }

  // 3. Populate Customer Details into form
  populateCustomerFields();

  // 4. Render checkout order items preview & calculation
  renderCheckoutSummary();

  // 5. Setup Form Submit & Delivery options
  setupCheckoutForm();
}

function populateCustomerFields() {
  const nameInput = document.getElementById('checkoutName');
  const emailInput = document.getElementById('checkoutEmail');
  const phoneInput = document.getElementById('checkoutPhone');

  if (nameInput && currentUser.fullName) nameInput.value = currentUser.fullName;
  if (emailInput && currentUser.email) emailInput.value = currentUser.email;
  if (phoneInput && currentUser.phone) phoneInput.value = currentUser.phone;
}

function renderCheckoutSummary() {
  const container = document.getElementById('checkoutItemsList');
  const subtotalEl = document.getElementById('checkoutSubtotal');
  const shippingEl = document.getElementById('checkoutShipping');
  const totalEl = document.getElementById('checkoutGrandTotal');
  if (!container) return;

  const cart = window.MP_COMMON.getCart();
  const subtotal = window.MP_COMMON.getCartSubtotal();

  let shipping = 0;
  if (subtotal >= 1500) {
    shipping = 0;
  } else {
    shipping = deliveryArea === 'inside' ? 60 : 120;
  }

  const grandTotal = subtotal + shipping;

  container.innerHTML = cart.map(item => `
    <div style="display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--color-border-subtle);">
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <img src="${item.image}" alt="${item.name}" style="width: 48px; height: 48px; border-radius: var(--radius-sm); object-fit: cover;">
        <div>
          <div style="font-weight: 600; font-size: 0.9rem; color: var(--color-white);">${item.name}</div>
          <div style="font-size: 0.75rem; color: var(--color-gold);">${item.size} × ${item.quantity}</div>
        </div>
      </div>
      <div style="font-weight: 700; color: var(--color-gold-light); font-size: 0.95rem;">
        ${window.MP_COMMON.formatPrice(item.price * item.quantity)}
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = window.MP_COMMON.formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : window.MP_COMMON.formatPrice(shipping);
  if (totalEl) totalEl.textContent = window.MP_COMMON.formatPrice(grandTotal);
}

function setupCheckoutForm() {
  // Delivery Area Radios
  const areaRadios = document.querySelectorAll('input[name="checkoutDeliveryArea"]');
  areaRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      deliveryArea = e.target.value;
      renderCheckoutSummary();
    });
  });

  // Form Submission
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleOrderPlacement();
    });
  }
}

function handleOrderPlacement() {
  const name = document.getElementById('checkoutName').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();
  const email = document.getElementById('checkoutEmail').value.trim();
  const address = document.getElementById('checkoutAddress').value.trim();
  const city = document.getElementById('checkoutCity').value.trim();
  const notes = (document.getElementById('checkoutNotes') ? document.getElementById('checkoutNotes').value.trim() : '');

  const paymentMethodInput = document.querySelector('input[name="paymentMethod"]:checked');
  const paymentMethod = paymentMethodInput ? paymentMethodInput.value : 'Cash on Delivery';

  if (!name || !phone || !address || !city) {
    alert('Please fill in all delivery details: Name, Phone, Address, and City.');
    return;
  }

  const cart = window.MP_COMMON.getCart();
  if (cart.length === 0) {
    alert('Cart is empty.');
    return;
  }

  const subtotal = window.MP_COMMON.getCartSubtotal();
  const shipping = subtotal >= 1500 ? 0 : (deliveryArea === 'inside' ? 60 : 120);
  const grandTotal = subtotal + shipping;

  // Generate Unique Order ID: MP-XXXXXXX
  const random7Digit = Math.floor(1000000 + Math.random() * 9000000);
  const orderId = `MP-${random7Digit}`;

  const newOrder = {
    id: orderId,
    userId: currentUser.id || 'guest',
    customerName: name,
    email: email,
    phone: phone,
    address: `${address}, ${city}` + (notes ? ` (Notes: ${notes})` : ''),
    deliveryArea: deliveryArea,
    items: cart,
    subtotal: subtotal,
    shippingFee: shipping,
    totalAmount: grandTotal,
    paymentMethod: paymentMethod,
    status: 'Pending', // Default initial status
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  // 1. Save to LocalStorage Orders List
  let allOrders = [];
  try {
    const raw = localStorage.getItem('mp_orders');
    allOrders = raw ? JSON.parse(raw) : [];
  } catch (err) {
    allOrders = [];
  }
  allOrders.unshift(newOrder); // Prepend to top
  localStorage.setItem('mp_orders', JSON.stringify(allOrders));

  // 2. Clear Cart
  window.MP_COMMON.clearCart();

  // 3. Show Success Notification
  window.MP_COMMON.showToast(`Order ${orderId} placed successfully!`);

  // 4. Redirect to Order Confirmation Receipt
  setTimeout(() => {
    window.location.href = `order.html?id=${encodeURIComponent(orderId)}`;
  }, 500);
}
