/**
 * MEHRAB PERFUME - ADMIN LOGIN SCRIPT
 * File: js/admin-login.js
 * 
 * Verifies admin credentials and establishes administrator session.
 * Default admin username: admin@mehrabperfume.com or naim15231@gmail.com
 * Default admin password: admin123456
 */

document.addEventListener('DOMContentLoaded', () => {
  // If already logged in, redirect straight to admin dashboard
  if (window.MP_AUTH.isAdminLoggedIn()) {
    window.location.href = 'admin.html';
    return;
  }

  const form = document.getElementById('adminLoginForm');
  const errorEl = document.getElementById('adminLoginError');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (errorEl) errorEl.style.display = 'none';

      const username = document.getElementById('adminUsername').value.trim();
      const password = document.getElementById('adminPassword').value;

      const result = window.MP_AUTH.loginAdmin(username, password);

      if (result.success) {
        window.MP_COMMON.showToast('Admin logged in successfully!');
        setTimeout(() => {
          window.location.href = 'admin.html';
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
});
