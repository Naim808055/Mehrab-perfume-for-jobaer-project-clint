# MEHRAB PERFUME — Beginner-Friendly Code Guide

Welcome to the **MEHRAB PERFUME** codebase guide! This document is designed for owners, designers, and developers who want to understand, edit, and expand this website with ease.

---

## 1. Quick Reference: Where to Change Things

| What do you want to change? | File to edit |
|-----------------------------|--------------|
| **WhatsApp Number / Phone** | `data.js` (line 12), `index.html`, `contact.html`, and `style.css` |
| **Store Physical Address** | `data.js`, `index.html`, `contact.html` |
| **Add / Edit Products** | Use the **Admin Dashboard** (`admin.html`) OR edit `data.js` |
| **Combo Pack Offers** | Use Admin Dashboard ("Combo Pack Offers" tab) OR edit `data.js` |
| **Colors, Fonts, Spacing** | `style.css` (check `:root` variables at the top) |
| **Navigation & Footer Links** | `index.html`, `shop.html`, `product.html`, `cart.html`, etc. |
| **Delivery Fees (Dhaka ৳60 / Outside ৳120)** | `js/common.js` (inside `calculateOrderTotals`) |

---

## 2. Core Architecture & Local Storage

This website is built with clean **HTML5, CSS3, and Vanilla JavaScript**. It requires zero complex build steps and runs instantly in any browser.

Data is stored across two layers:
1. **Initial Seed Data (`data.js`)**: Contains default 50+ master perfumes, initial combos, and store contact info.
2. **Dynamic Persistence (`localStorage`)**:
   - `mp_products`: Custom or modified perfumes saved by Admin.
   - `mp_combos`: Combo packs saved by Admin with `isActive` (ON / OFF) state.
   - `mp_cart`: Shopping cart items with selected size and quantity.
   - `mp_orders`: All submitted customer orders with items, addresses, and statuses.
   - `mp_customers`: Registered customer accounts.
   - `mp_current_user`: Currently logged-in customer session.
   - `mp_admin_user`: Currently logged-in admin session.

> **Tip**: If you ever want to reset back to factory default products, open your browser developer tools (F12) -> Console, and type `localStorage.clear()` and refresh.

---

## 3. How the 50+ Perfume Product System Works

Every perfume product in `data.js` follows this clean structure:

```javascript
{
  id: "mehrab-01",
  name: "Imperial Amber Oud",
  category: "Oud", // Oud | Musk | Floral | Woody
  badge: "Bestseller", // Bestseller | Exclusive | Royal Reserve | New Release | null
  
  // Pricing for 3 sizes
  prices: {
    "6ml": 550,
    "12ml": 990,
    "15ml": 1200
  },
  
  rating: 4.9,
  reviewsCount: 38,
  description: "A majestic fusion of aged Cambodian agarwood...",
  
  // 3 Required Images:
  images: [
    "https://example.com/front-angle.jpg",     // Image 1: Main front
    "https://example.com/side-angle.jpg",      // Image 2: Side view
    "https://example.com/packaging-angle.jpg"  // Image 3: Presentation box
  ],
  isActive: true // true: visible in store, false: hidden
}
```

### Adding a New Perfume:
You can add perfumes in two ways:
1. **Via Admin Panel**: Open `admin.html`, go to the "Products" tab, click **"+ Add New Perfume"**, fill in the 3 images and 3 prices, and hit Save.
2. **Via Code**: Open `data.js`, duplicate one of the objects inside `INITIAL_PRODUCTS`, assign a unique `id` (e.g. `mehrab-51`), and save.

---

## 4. The 3-Image Gallery System (`js/product.js`)

When a user visits `product.html?id=mehrab-01`:
1. `js/product.js` reads the URL parameter `id`.
2. It fetches the product from `localStorage` or `data.js`.
3. It displays `product.images[0]` in the large preview box (`#mainImageWrapper`).
4. It creates clickable thumbnails (`#galleryThumbsWrapper`) for each of the 3 images. Clicking any thumbnail smoothly swaps the main preview image.

---

## 5. The 3 Required Action Buttons (`product.html`)

Under the perfume details and size selector, three distinct action buttons are provided:

1. **`#btnOrderNow` ("Order This Perfume")**:
   - Adds the selected scent + selected size + chosen quantity directly to the cart.
   - Immediately redirects the user straight to `checkout.html` for single-click buying.

2. **`#btnAddToCart` ("Add to Cart")**:
   - Adds the item to the cart without navigating away.
   - Displays a luxury animated toast notification (e.g. *"Added to Cart: Imperial Amber Oud (12ml) × 1"*).
   - Animates the header cart badge counter.

3. **`#btnOrderWhatsApp` ("Order via WhatsApp")**:
   - Prepares a formatted WhatsApp order text:
     ```
     Salam MEHRAB PERFUME! I would like to order:
     • Scent: Imperial Amber Oud
     • Size: 12ml
     • Quantity: 1
     • Price: ৳990
     ```
   - Automatically directs the user to `wa.me/8801938199254`.

---

## 6. Combo Pack System: OFFER ON / OFFER OFF

Combos are highlighted bundles displayed on the home page (`index.html`).
In the Admin Dashboard (`admin.html` -> "Combo Pack Offers" tab):
- Each combo has a toggle button: **OFFER ON** (green) or **OFFER OFF** (gray).
- When set to **OFFER OFF**, `js/home.js` automatically filters out that combo, so visitors to the store will **NOT** see it.
- When toggled back to **OFFER ON**, it instantly reappears on the home page.

---

## 7. Customer Order Cancellation Rule

Customers can track and manage their orders under `account.html` or `order.html`:
- If an order's status is **"Pending"** or **"Confirmed"**, a **"Cancel Order"** button is displayed.
- Clicking "Cancel Order" requests confirmation and updates the status to **"Cancelled"**.
- If an order is already marked **"Delivered"** by the Admin, the order is locked and cannot be cancelled.

---

## 8. Admin Authentication & Security

- **Admin Login Page**: `admin-login.html`
- **Dashboard**: `admin.html`
- **Default Login**:
  - Email: `admin@mehrabperfume.com`
  - Password: `admin123456`
- **Changing Admin Credentials**:
  Open `js/auth.js` and locate lines 15-18:
  ```javascript
  const DEFAULT_ADMIN = {
    email: 'admin@mehrabperfume.com',
    password: 'admin123456',
    name: 'Mehrab Master Admin'
  };
  ```
  Change these values to your desired admin credentials.

---

## 9. Customizing the Design System (`style.css`)

All color palettes, fonts, and border radii are defined at the very top of `style.css`:

```css
:root {
  /* Brand Navy & Dark Palette */
  --color-bg-dark: #071017;
  --color-bg-card: #0c1822;

  /* Luxury Gold Accents */
  --color-gold: #D9AE52;
  --color-gold-light: #F1CF82;

  /* Backgrounds & Text */
  --color-cream: #FAF8F3;
  --color-white: #FFFFFF;
  --color-gray-text: #9EABB8;

  /* Typography */
  --font-serif: 'Playfair Display', Georgia, serif;
  --font-sans: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
}
```
Modifying these CSS variables updates the entire website consistently across all 11 pages!

---

*Crafted with excellence for MEHRAB PERFUME — More Than Just a Scent.*
