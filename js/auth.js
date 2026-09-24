/**
 * MEHRAB PERFUME - AUTHENTICATION MANAGER
 * File: js/auth.js
 * 
 * Handles:
 * - Customer Registration & Validation
 * - Customer Login & Session Persistence
 * - Firebase Google Sign-in integration
 * - Admin Authentication & Route Protection
 */

// Keys for Storage
const STORAGE_KEYS = {
  CUSTOMERS: 'mp_customers',
  CURRENT_USER: 'mp_current_user',
  ADMIN_SESSION: 'mp_admin_session'
};

// Default Administrator Credentials
const ADMIN_CREDENTIALS = {
  username: 'admin@mehrabperfume.com',
  altEmail: 'naim15231@gmail.com',
  password: 'admin123456'
};

// 1. GET REGISTERED CUSTOMERS
function getRegisteredCustomers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return raw ? JSON.parse(raw) : [
      {
        id: 'cust-demo-1',
        fullName: 'Mohammad Tanvir Rahman',
        email: 'tanvir.rahman@gmail.com',
        phone: '01711223344',
        password: 'password123',
        createdAt: new Date().toISOString()
      }
    ];
  } catch (e) {
    console.error('Error reading customers:', e);
    return [];
  }
}

function saveRegisteredCustomers(customers) {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  } catch (e) {
    console.error('Error saving customers:', e);
  }
}

// 2. GET CURRENT LOGGED IN USER
function getCurrentUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
  if (window.MP_COMMON && window.MP_COMMON.updateNavUserStatus) {
    window.MP_COMMON.updateNavUserStatus();
  }
}

// 3. REGISTER NEW CUSTOMER
function registerCustomer(fullName, email, phone, password, confirmPassword) {
  // Field validations
  if (!fullName || !email || !phone || !password || !confirmPassword) {
    return { success: false, message: 'Please fill in all required fields.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  if (password !== confirmPassword) {
    return { success: false, message: 'Passwords do not match. Please re-enter.' };
  }

  const customers = getRegisteredCustomers();
  const existing = customers.find(c => c.email.toLowerCase() === email.trim().toLowerCase());
  if (existing) {
    return { success: false, message: 'An account with this email already exists. Please log in.' };
  }

  const newCustomer = {
    id: 'cust-' + Date.now(),
    fullName: fullName.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    password: password,
    role: 'customer',
    createdAt: new Date().toISOString()
  };

  customers.push(newCustomer);
  saveRegisteredCustomers(customers);

  // Automatically log in after registration
  setCurrentUser({
    id: newCustomer.id,
    fullName: newCustomer.fullName,
    email: newCustomer.email,
    phone: newCustomer.phone,
    role: newCustomer.role
  });

  return { success: true, message: 'Registration successful! Welcome to Mehrab Perfume.', user: newCustomer };
}

// 4. CUSTOMER LOGIN
function loginCustomer(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Please enter both email and password.' };
  }

  const cleanEmail = email.trim().toLowerCase();
  const customers = getRegisteredCustomers();
  const user = customers.find(c => c.email.toLowerCase() === cleanEmail && c.password === password);

  if (!user) {
    return { success: false, message: 'Invalid email or password. Please try again.' };
  }

  setCurrentUser({
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role || 'customer'
  });

  return { success: true, message: `Welcome back, ${user.fullName}!`, user };
}

// 5. CUSTOMER LOGOUT
function logoutCustomer() {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  } catch (e) {
    console.error('Error during logout:', e);
  }
  if (window.MP_COMMON && window.MP_COMMON.showToast) {
    window.MP_COMMON.showToast('You have logged out successfully.');
  }
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 100);
}

// 6. REQUIRE CUSTOMER AUTHENTICATION (FOR CHECKOUT / ACCOUNT)
function requireCustomerAuth(redirectTarget) {
  const user = getCurrentUser();
  if (!user) {
    const target = redirectTarget || window.location.pathname.split('/').pop() || 'index.html';
    window.location.href = `auth.html?redirect=${encodeURIComponent(target)}`;
    return false;
  }
  return true;
}

// 7. ADMIN AUTHENTICATION
function isAdminLoggedIn() {
  try {
    const session = sessionStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) || localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
    if (!session) return false;
    const parsed = JSON.parse(session);
    return parsed && parsed.role === 'admin';
  } catch (e) {
    return false;
  }
}

function loginAdmin(username, password) {
  const cleanUser = (username || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const isMatch = (
    (cleanUser === ADMIN_CREDENTIALS.username.toLowerCase() || cleanUser === ADMIN_CREDENTIALS.altEmail.toLowerCase() || cleanUser === 'admin') &&
    cleanPass === ADMIN_CREDENTIALS.password
  );

  if (isMatch) {
    const adminData = {
      username: cleanUser,
      email: cleanUser.includes('@') ? cleanUser : ADMIN_CREDENTIALS.username,
      role: 'admin',
      loggedInAt: new Date().toISOString()
    };
    sessionStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminData));
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(adminData));
    return { success: true, message: 'Admin authentication successful!' };
  }

  return { success: false, message: 'Invalid admin username or password.' };
}

function logoutAdmin() {
  sessionStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  window.location.href = 'admin-login.html';
}

function requireAdminAuth() {
  if (!isAdminLoggedIn()) {
    window.location.href = 'admin-login.html';
    return false;
  }
  return true;
}

// EXPORT TO GLOBAL
window.MP_AUTH = {
  getRegisteredCustomers,
  getCurrentUser,
  setCurrentUser,
  registerCustomer,
  loginCustomer,
  logoutCustomer,
  requireCustomerAuth,
  isAdminLoggedIn,
  loginAdmin,
  logoutAdmin,
  requireAdminAuth
};
