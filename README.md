# MEHRAB PERFUME — Luxury Artisanal E-Commerce Platform

> **"More Than Just a Scent."**

A complete, high-performance, mobile-responsive e-commerce platform built for **MEHRAB PERFUME**, an artisanal perfume and pure attar house based in Uttara, Dhaka, Bangladesh.

---

## 🏛 Brand & Business Information

- **Brand Name**: MEHRAB PERFUME
- **Tagline**: More Than Just a Scent.
- **WhatsApp / Phone Hotline**: `01938199254` ([wa.me/8801938199254](https://wa.me/8801938199254))
- **Email**: `mehrab140822@gmail.com`
- **Location**: Uttara sector 3 takwa masjid fast gate, Dhaka, Bangladesh, 1230
- **Official Facebook**: [facebook.com/share/1DG9Jf4tPr/](https://www.facebook.com/share/1DG9Jf4tPr/)

---

## 🎨 Visual Identity & Styling

- **Primary Colors**:
  - Dark Navy / Near Black: `#071017`
  - Luxury Gold Accent: `#D9AE52` & `#F1CF82`
  - Cream / Warm Ivory: `#FAF8F3`
  - Pure White: `#FFFFFF`
- **Typography**:
  - Headings: *Playfair Display* (Editorial luxury serif)
  - Body & UI: *DM Sans* (Clean, legible sans-serif)

---

## 📁 File Structure

The project strictly follows clean modular separation of concerns without dumping everything into one HTML file:

```
├── index.html            # Home page (Hero slider, bestsellers, combos, collections, about, contact)
├── shop.html             # Fragrance catalog with real-time filtering, search, and sorting
├── product.html          # Product page with 3-image gallery & 3 action buttons
├── cart.html             # Shopping cart with delivery area calculator & free shipping meter
├── checkout.html         # Cash on Delivery checkout with customer pre-fill
├── order.html            # Order receipt invoice, WhatsApp tracking & order cancellation
├── contact.html          # Contact page with store location, hotline, and WhatsApp form
├── auth.html             # Customer Registration & Login portal
├── account.html          # Customer account dashboard & order history
├── admin-login.html      # Secure admin authentication gate
├── admin.html            # Administrative control center (Orders, Products, Combos, Customers)
│
├── style.css             # Unified luxury stylesheet & responsive layout system
├── data.js               # 50+ master perfumes, initial combos, and store defaults
│
├── js/
│   ├── common.js         # Shared utilities (Cart management, toasts, badges, WhatsApp formatters)
│   ├── auth.js           # Auth state manager for customers and admin (localStorage backed)
│   ├── home.js           # Slider logic, dynamic collections & combo section rendering
│   ├── shop.js           # Catalog search, filter pills, sorting, and dynamic cards
│   ├── product.js        # 3-image system, size pricing (6ml/12ml/15ml), direct order
│   ├── cart.js           # Quantity modifiers, shipping rules, order summaries
│   ├── checkout.js       # Form validation, guest & customer checkout, order creation
│   ├── order.js          # Order invoice renderer, status display, cancellation handler
│   ├── auth-page.js      # Customer login and registration tabs
│   ├── account.js        # Customer profile, orders list, customer cancel button
│   ├── admin-login.js    # Admin login verification
│   └── admin.js          # Admin stats, order filters, 3-image product manager, combo toggles
│
├── public/assets/
│   └── logo.svg          # Brand vector monogram & crest
│
├── CODE-GUIDE.md         # Comprehensive developer documentation & edit guide
└── README.md             # This project overview
```

---

## 🌟 Key Features

### 1. 50+ Curated Artisanal Perfumes
- 4 Categories: **Oud**, **Musk**, **Floral**, **Woody**
- Every product supports 3 sizes: **6ml**, **12ml (Standard)**, **15ml (Grand)**
- Dynamic price updating when the customer selects different bottle volumes.

### 2. Required 3-Image System
- Large featured view + 3 interactive gallery thumbnails on `product.html`.
- Admin dashboard allows configuring all 3 image URLs for any perfume.

### 3. Required 3 Action Buttons on Product Page
1. **"Order This Perfume"** — Instantly adds item and routes to checkout.
2. **"Add to Cart"** — Adds item to local cart with toast notification and updates nav counter.
3. **"Order via WhatsApp"** — Formats product name, size, price, and customer message directly into a WhatsApp link for `01938199254`.

### 4. Combo Pack System with Public Toggle
- Combos feature eyebrow tag, title, description, image, and bundle savings.
- Admin has an **OFFER ON / OFFER OFF** toggle:
  - When **OFFER OFF**, the combo is automatically hidden from the home page.
  - When **OFFER ON**, it is dynamically showcased in the curated combos grid.

### 5. Order Cancellation Workflow
- Customers can cancel their own orders from `account.html` or `order.html` as long as the status is **Pending** or **Confirmed**.
- Once **Delivered**, cancellation is locked.
- Admin dashboard reflects cancellation in real-time.

### 6. Admin Control Center
- **Access**: `admin-login.html`
- **Default Credentials**:
  - Email: `admin@mehrabperfume.com`
  - Password: `admin123456`
- **Dashboard Features**:
  - Stat cards: Total Orders, Total Revenue, Active Products, Pending Orders.
  - Order Management: Search by ID/name, filter by status, view detailed invoice modal.
  - Product Management: Add, edit, delete, activate/deactivate perfumes with 3 images and 3 size prices.
  - Combo Management: Create bundle offers, toggle visibility.
  - Customer Directory: Track registered shoppers and order volume.
  - Settings: Update hotline, email, and Takwa Masjid address.

---

## 🚀 Running & Testing the Website

1. The site runs natively in any modern web browser or via Vite dev server:
   ```bash
   npm run dev
   ```
2. Open `http://localhost:3000` to view the homepage.
3. Navigate to `shop.html` to browse scents, click any scent to inspect the 3-image gallery, choose between 6ml, 12ml, and 15ml, and test cart or direct WhatsApp ordering.
4. Log into `admin-login.html` to test product additions, order approvals, or combo toggles.
