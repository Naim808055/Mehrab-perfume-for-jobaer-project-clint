/**
 * MEHRAB PERFUME - AUTHENTICATION PAGE SCRIPT
 * File: js/auth-page.js
 * 
 * Controls:
 * - Switching between Login and Register tabs
 * - Customer Registration submission & validation
 * - Customer Login submission
 * - Preserving redirect query parameter (?redirect=checkout.html)
 * - Automatic sign-in and redirect to target page
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuthPage();
});

function initAuthPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const redirectTarget = urlParams.get('redirect') || 'account.html';
  const initialTab = urlParams.get('tab') || 'login';

  // If already logged in, redirect right away
  const currentUser = window.MP_AUTH.getCurrentUser();
  if (currentUser) {
    window.location.href = redirectTarget;
    return;
  }

  setupTabs(initialTab);
  setupLoginForm(redirectTarget);
  setupRegisterForm(redirectTarget);
}

function setupTabs(defaultTab = 'login') {
  const tabLogin = document.getElementById('tabLoginBtn');
  const tabRegister = document.getElementById('tabRegisterBtn');
  const loginFormWrap = document.getElementById('loginFormWrapper');
  const registerFormWrap = document.getElementById('registerFormWrapper');

  function switchTab(tab) {
    if (tab === 'register') {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      registerFormWrap.style.display = 'block';
      loginFormWrap.style.display = 'none';
    } else {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginFormWrap.style.display = 'block';
      registerFormWrap.style.display = 'none';
    }
  }

  if (tabLogin && tabRegister) {
    tabLogin.addEventListener('click', () => switchTab('login'));
    tabRegister.addEventListener('click', () => switchTab('register'));
  }

  // Switch to default tab
  switchTab(defaultTab);

  // Switch buttons inside form
  const toRegisterBtn = document.getElementById('linkToRegister');
  const toLoginBtn = document.getElementById('linkToLogin');
  if (toRegisterBtn) toRegisterBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab('register'); });
  if (toLoginBtn) toLoginBtn.addEventListener('click', (e) => { e.preventDefault(); switchTab('login'); });
}

function setupLoginForm(redirectTarget) {
  const form = document.getElementById('customerLoginForm');
  const errorEl = document.getElementById('loginErrorMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (errorEl) errorEl.style.display = 'none';

      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      const result = window.MP_AUTH.loginCustomer(email, password);

      if (result.success) {
        window.MP_COMMON.showToast(result.message);
        setTimeout(() => {
          window.location.href = redirectTarget;
        }, 500);
      } else {
        if (errorEl) {
          errorEl.textContent = result.message;
          errorEl.style.display = 'block';
        } else {
          alert(result.message);
        }
      }
    });
  }
}

function setupRegisterForm(redirectTarget) {
  const form = document.getElementById('customerRegisterForm');
  const errorEl = document.getElementById('registerErrorMsg');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (errorEl) errorEl.style.display = 'none';

      const fullName = document.getElementById('regFullName').value.trim();
      const email = document.getElementById('regEmail').value.trim();
      const phone = document.getElementById('regPhone').value.trim();
      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      const result = window.MP_AUTH.registerCustomer(fullName, email, phone, password, confirmPassword);

      if (result.success) {
        window.MP_COMMON.showToast(result.message);
        setTimeout(() => {
          window.location.href = redirectTarget;
        }, 600);
      } else {
        if (errorEl) {
          errorEl.textContent = result.message;
          errorEl.style.display = 'block';
        } else {
          alert(result.message);
        }
      }
    });
  }
}
