// ── NÜMA Pets — Centralized API Client ──────────────────────────────────────
// All HTTP calls to the back-end go through here.
// Automatically injects the JWT token from localStorage.

const BASE_URL = '/api'; // Proxied by Vite → http://localhost:3001

function getToken() {
  return localStorage.getItem('numa_token');
}

async function request(method, path, body = null, requiresAuth = false) {
  const headers = { 'Content-Type': 'application/json' };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  } else if (requiresAuth) {
    throw new Error('Authentification requise. Veuillez vous connecter.');
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${BASE_URL}${path}`, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const msg = data.error || data.message || `Erreur ${response.status}`;
    const err = new Error(msg);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ── Auth ───────────────────────────────────────────────────────────────────
export const auth = {
  register: (payload) => request('POST', '/auth/register', payload),
  login:    (email, password) => request('POST', '/auth/login', { email, password }),
  me:       () => request('GET', '/auth/me', null, true),

  saveToken: (token) => localStorage.setItem('numa_token', token),
  clearToken: () => localStorage.removeItem('numa_token'),
  isLoggedIn: () => !!getToken(),
};

// ── Products ───────────────────────────────────────────────────────────────
export const products = {
  list:   (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request('GET', `/products${qs ? '?' + qs : ''}`);
  },
  get:    (slug)    => request('GET', `/products/${slug}`),
  create: (payload) => request('POST', '/products', payload, true),
  update: (id, payload) => request('PUT', `/products/${id}`, payload, true),
  delete: (id)      => request('DELETE', `/products/${id}`, null, true),
};

// ── Reviews ────────────────────────────────────────────────────────────────
export const reviews = {
  list:   (productId) => request('GET', `/products/${productId}/reviews`),
  create: (productId, payload) => request('POST', `/products/${productId}/reviews`, payload),
};

// ── Orders ─────────────────────────────────────────────────────────────────
export const orders = {
  list:       ()         => request('GET',  '/orders', null, true),
  get:        (id)       => request('GET',  `/orders/${id}`, null, true),
  create:     (payload)  => request('POST', '/orders', payload, true),
  updateStatus: (id, status, statusTag) =>
    request('PATCH', `/orders/${id}/status`, { status, statusTag }, true),
  adminAll: () => request('GET', '/orders/admin/all', null, true),
};

// ── Subscriptions ──────────────────────────────────────────────────────────
export const subscriptions = {
  list:   ()               => request('GET',    '/subscriptions', null, true),
  create: (payload)        => request('POST',   '/subscriptions', payload, true),
  update: (id, payload)    => request('PATCH',  `/subscriptions/${id}`, payload, true),
  delete: (id)             => request('DELETE', `/subscriptions/${id}`, null, true),
};

// ── Users ──────────────────────────────────────────────────────────────────
export const users = {
  me:             ()          => request('GET',    '/users/me', null, true),
  update:         (payload)   => request('PUT',    '/users/me', payload, true),
  changePassword: (current, next) =>
    request('PUT', '/users/me/password', { currentPassword: current, newPassword: next }, true),
  addAddress:    (payload)    => request('POST',   '/users/me/addresses', payload, true),
  deleteAddress: (id)         => request('DELETE', `/users/me/addresses/${id}`, null, true),
  getFavorites:  ()           => request('GET',    '/users/me/favorites', null, true),
  addFavorite:   (productId)  => request('POST',   `/users/me/favorites/${productId}`, null, true),
  removeFavorite:(productId)  => request('DELETE', `/users/me/favorites/${productId}`, null, true),
};

// ── Discounts ──────────────────────────────────────────────────────────────
export const discounts = {
  validate: (code)    => request('GET', `/discounts?code=${encodeURIComponent(code)}`),
  list:     ()        => request('GET', '/discounts', null, true),
  create:   (payload) => request('POST', '/discounts', payload, true),
  delete:   (code)    => request('DELETE', `/discounts/${code}`, null, true),
};

// ── Health ─────────────────────────────────────────────────────────────────
export const health = {
  check: () => request('GET', '/health'),
};

export default { auth, products, reviews, orders, subscriptions, users, discounts, health };
