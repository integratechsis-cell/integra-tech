const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = {
  // Wompi
  getPaymentSignature: async (reference, amount, currency) => {
    try {
        console.log(`Pidiendo firma a: ${API_URL}/payment/signature`);
        const res = await fetch(`${API_URL}/payment/signature`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference, amount, currency }),
        });
        if (!res.ok) {
            console.error("Error al obtener firma:", await res.text());
            return { signature: null };
        }
        return res.json();
    } catch (e) {
        console.error("Excepción al obtener firma:", e);
        return { signature: null };
    }
  },

  // Auth
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  forgotPassword: async (email: string) => {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  resetPasswordWithToken: async (token: string, password: string) => {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  register: async (email, password, full_name, role) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name, role }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Products
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw await res.json();
    return res.json();
  },
  
  createProduct: async (product) => {
      const res = await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
      });
      if (!res.ok) throw await res.json();
      return res.json();
  },

  updateProduct: async (id, product) => {
      const res = await fetch(`${API_URL}/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product)
      });
      if (!res.ok) throw await res.json();
      return res.json();
  },

  deleteProduct: async (id) => {
      const res = await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw await res.json();
      return res.json();
  },

  // Courses
  getCourses: async () => {
    const res = await fetch(`${API_URL}/courses`);
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Orders
  getOrders: async () => {
    const res = await fetch(`${API_URL}/orders`);
    if (!res.ok) throw await res.json();
    return res.json();
  },

  createOrder: async (orderData) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  // Users (Admin)
  getUsers: async () => {
    const res = await fetch(`${API_URL}/users`);
    if (!res.ok) throw await res.json();
    return res.json();
  },

  toggleUserStatus: async (id, is_active) => {
    const res = await fetch(`${API_URL}/users/${id}/toggle-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  resetUserPassword: async (id, password) => {
    const res = await fetch(`${API_URL}/users/${id}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },
  
  updateUserRole: async (id, role) => {
      const res = await fetch(`${API_URL}/users/${id}/role`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) throw await res.json();
      return res.json();
  },

  // Enrollments
  deleteUser: async (id: string) => {
    const res = await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  enrollUser: async (userId, courseId) => {
    const res = await fetch(`${API_URL}/enrollments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  unenrollUser: async (userId, courseId) => {
    const res = await fetch(`${API_URL}/enrollments`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, courseId }),
    });
    if (!res.ok) throw await res.json();
    return res.json();
  },

  getGrades: async () => {
    const res = await fetch(`${API_URL}/grades`); // Mapped to enrollments on backend
    if (!res.ok) throw await res.json();
    return res.json();
  }
};
