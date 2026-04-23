// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('authToken');
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getAuthHeader() {
    return {
      'Content-Type': 'application/json',
      ...(this.token && { 'Authorization': `Bearer ${this.token}` })
    };
  }

  async request(endpoint, method = 'GET', data = null) {
    try {
      const options = {
        method,
        headers: this.getAuthHeader()
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'An error occurred');
      }

      return result;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Auth Methods
  async login(email, password) {
    return this.request('/auth/login', 'POST', { email, password });
  }

  async register(name, email, password, role, branch) {
    return this.request('/auth/register', 'POST', { name, email, password, role, branch });
  }

  async getCurrentUser() {
    return this.request('/auth/me', 'GET');
  }

  async logout() {
    return this.request('/auth/logout', 'POST');
  }

  // Super Admin Methods
  async getSuperAdminDashboard() {
    return this.request('/super-admin/dashboard', 'GET');
  }

  async createBranch(data) {
    return this.request('/super-admin/branches', 'POST', data);
  }

  async getBranches() {
    return this.request('/super-admin/branches', 'GET');
  }

  async updateBranch(branchId, data) {
    return this.request(`/super-admin/branches/${branchId}`, 'PUT', data);
  }

  async deleteBranch(branchId) {
    return this.request(`/super-admin/branches/${branchId}`, 'DELETE');
  }

  async createBranchAdmin(data) {
    return this.request('/super-admin/admins', 'POST', data);
  }

  async getAdmins() {
    return this.request('/super-admin/admins', 'GET');
  }

  async deactivateAdmin(adminId) {
    return this.request(`/super-admin/admins/${adminId}/deactivate`, 'PUT');
  }

  async getSuperAdminAnalytics(period = '30') {
    return this.request(`/super-admin/analytics?period=${period}`, 'GET');
  }

  // Branch Admin Methods
  async getBranchAdminDashboard() {
    return this.request('/branch-admin/dashboard', 'GET');
  }

  async addProduct(data) {
    return this.request('/branch-admin/products', 'POST', data);
  }

  async getBranchProducts(status) {
    const query = status ? `?status=${status}` : '';
    return this.request(`/branch-admin/products${query}`, 'GET');
  }

  async updateProduct(productId, data) {
    return this.request(`/branch-admin/products/${productId}`, 'PUT', data);
  }

  async deleteProduct(productId) {
    return this.request(`/branch-admin/products/${productId}`, 'DELETE');
  }

  async getBranchOrders(status, page = 1) {
    const query = `?page=${page}${status ? `&status=${status}` : ''}`;
    return this.request(`/branch-admin/orders${query}`, 'GET');
  }

  async updateOrderStatus(orderId, status) {
    return this.request(`/branch-admin/orders/${orderId}/status`, 'PUT', { status });
  }

  async getBranchAnalytics(period = '30') {
    return this.request(`/branch-admin/analytics?period=${period}`, 'GET');
  }

  // Products Methods
  async getAllProducts(category) {
    const query = category ? `?category=${category}` : '';
    return this.request(`/products${query}`, 'GET');
  }

  async getProduct(productId) {
    return this.request(`/products/${productId}`, 'GET');
  }

  // Orders Methods
  async createOrder(data) {
    return this.request('/orders', 'POST', data);
  }

  async getAllOrders(branch, status, page = 1) {
    const query = `?page=${page}${branch ? `&branch=${branch}` : ''}${status ? `&status=${status}` : ''}`;
    return this.request(`/orders${query}`, 'GET');
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`, 'GET');
  }

  // Analytics Methods
  async getAnalytics(period = '30', branch) {
    const query = `?period=${period}${branch ? `&branch=${branch}` : ''}`;
    return this.request(`/analytics${query}`, 'GET');
  }
}

// Create a global instance
const apiClient = new ApiClient();
