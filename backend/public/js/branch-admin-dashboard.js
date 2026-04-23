// Branch Admin Dashboard
class BranchAdminDashboard {
  constructor() {
    this.api = apiClient;
    this.currentUser = null;
    this.revenueChart = null;
    this.topProductsChart = null;
    this.init();
  }

  async init() {
    try {
      // Check authentication
      const user = await this.api.getCurrentUser();
      this.currentUser = user.user;

      // Update user info
      document.getElementById('userName').textContent = this.currentUser.name;
      document.getElementById('branchName').textContent = this.currentUser.branch?.name || 'Branch';
      if (this.currentUser.avatar) {
        document.getElementById('userAvatar').src = this.currentUser.avatar;
      }

      // Load initial data
      await this.loadDashboard();
      this.setupEventListeners();
    } catch (error) {
      console.error('Authentication error:', error);
      window.location.href = '/login';
    }
  }

  setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => this.switchSection(e));
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => this.logout());

    // Add Product
    document.getElementById('addProductBtn')?.addEventListener('click', () => this.showProductModal());
    document.getElementById('productForm')?.addEventListener('submit', (e) => this.createProduct(e));

    // Filters
    document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
      this.loadProducts(e.target.value);
    });
    document.getElementById('orderStatusFilter')?.addEventListener('change', (e) => {
      this.loadOrders(e.target.value);
    });

    // Analytics Period Filter
    document.getElementById('analyticsPeriod')?.addEventListener('change', (e) => {
      this.loadAnalytics(e.target.value);
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.target.closest('.modal').classList.remove('show');
      });
    });
  }

  switchSection(event) {
    event.preventDefault();
    const sectionName = event.target.closest('.nav-item')?.dataset.section;
    if (!sectionName) return;

    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('active');
    });
    event.target.closest('.nav-item').classList.add('active');

    // Update page title
    const titles = {
      'dashboard': 'Dashboard',
      'products': 'Product Management',
      'orders': 'Orders',
      'analytics': 'Branch Analytics',
      'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';

    // Show/hide sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionName)?.classList.add('active');

    // Load section data
    if (sectionName === 'products') {
      this.loadProducts();
    } else if (sectionName === 'orders') {
      this.loadOrders();
    } else if (sectionName === 'analytics') {
      this.loadAnalytics();
    }
  }

  async loadDashboard() {
    try {
      const response = await this.api.getBranchAdminDashboard();
      const { stats, pendingOrders, lowStockProducts } = response.dashboard;

      // Update stats
      document.getElementById('totalProducts').textContent = stats.totalProducts;
      document.getElementById('totalOrders').textContent = stats.totalOrders;
      document.getElementById('totalRevenue').textContent = `$${stats.totalRevenue.toFixed(2)}`;
      document.getElementById('pendingOrders').textContent = stats.pendingOrders;

      // Update pending orders table
      const pendingTable = document.getElementById('pendingOrdersTable');
      if (pendingOrders.length > 0) {
        pendingTable.innerHTML = pendingOrders.map(order => `
          <tr>
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>$${order.totalAmount.toFixed(2)}</td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <button class="btn btn-primary" onclick="branchAdmin.updateOrderStatus('${order._id}')">Update</button>
            </td>
          </tr>
        `).join('');
      } else {
        pendingTable.innerHTML = '<tr><td colspan="5">No pending orders</td></tr>';
      }

      // Update low stock table
      const lowStockTable = document.getElementById('lowStockTable');
      if (lowStockProducts.length > 0) {
        lowStockTable.innerHTML = lowStockProducts.map(product => `
          <tr>
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
            <td>
              <button class="btn btn-primary" onclick="branchAdmin.editProduct('${product._id}')">Restock</button>
            </td>
          </tr>
        `).join('');
      } else {
        lowStockTable.innerHTML = '<tr><td colspan="4">All products in stock</td></tr>';
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      this.showNotification('Error loading dashboard', 'error');
    }
  }

  async loadProducts(category = '') {
    try {
      const response = await this.api.getBranchProducts(category || undefined);
      const table = document.getElementById('productsTable');

      if (response.products.length > 0) {
        table.innerHTML = response.products.map(product => `
          <tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td><span class="status ${product.status}">${product.status}</span></td>
            <td>
              <button class="btn btn-primary" onclick="branchAdmin.editProduct('${product._id}')">Edit</button>
              <button class="btn btn-danger" onclick="branchAdmin.deleteProduct('${product._id}')">Delete</button>
            </td>
          </tr>
        `).join('');
      } else {
        table.innerHTML = '<tr><td colspan="6">No products found</td></tr>';
      }
    } catch (error) {
      console.error('Error loading products:', error);
      this.showNotification('Error loading products', 'error');
    }
  }

  async loadOrders(status = '') {
    try {
      const response = await this.api.getBranchOrders(status || undefined);
      const table = document.getElementById('allOrdersTable');

      if (response.orders.length > 0) {
        table.innerHTML = response.orders.map(order => `
          <tr>
            <td>${order.orderId}</td>
            <td>${order.customerName}</td>
            <td>${order.items.length}</td>
            <td>$${order.totalAmount.toFixed(2)}</td>
            <td><span class="status-${order.status}">${order.status}</span></td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
            <td>
              <button class="btn btn-primary" onclick="branchAdmin.updateOrderStatus('${order._id}')">Update</button>
            </td>
          </tr>
        `).join('');
      } else {
        table.innerHTML = '<tr><td colspan="7">No orders found</td></tr>';
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      this.showNotification('Error loading orders', 'error');
    }
  }

  async loadAnalytics(period = '30') {
    try {
      const response = await this.api.getBranchAnalytics(period);
      const { revenueData, topProducts } = response.analytics;

      // Destroy existing charts
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }
      if (this.topProductsChart) {
        this.topProductsChart.destroy();
      }

      // Create revenue chart
      const revenueCtx = document.getElementById('revenueChart')?.getContext('2d');
      if (revenueCtx) {
        this.revenueChart = new Chart(revenueCtx, {
          type: 'line',
          data: {
            labels: revenueData.map(item => item._id),
            datasets: [{
              label: 'Revenue',
              data: revenueData.map(item => item.revenue),
              borderColor: '#FF6B35',
              backgroundColor: 'rgba(255, 107, 53, 0.1)',
              tension: 0.4,
              fill: true
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' }
            }
          }
        });
      }

      // Create top products chart
      const topProductsCtx = document.getElementById('topProductsChart')?.getContext('2d');
      if (topProductsCtx && topProducts.length > 0) {
        this.topProductsChart = new Chart(topProductsCtx, {
          type: 'bar',
          data: {
            labels: topProducts.map(item => item.product[0]?.name || 'Unknown'),
            datasets: [{
              label: 'Quantity Sold',
              data: topProducts.map(item => item.totalQuantity),
              backgroundColor: '#004E89'
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { display: true, position: 'top' }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  }

  showProductModal() {
    document.getElementById('addProductModal').classList.add('show');
  }

  async createProduct(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('productName').value,
      sku: document.getElementById('productSku').value,
      category: document.getElementById('productCategory').value,
      price: parseFloat(document.getElementById('productPrice').value),
      quantity: parseInt(document.getElementById('productQuantity').value),
      description: document.getElementById('productDescription').value
    };

    try {
      await this.api.addProduct(data);
      this.showNotification('Product added successfully', 'success');
      document.getElementById('productForm').reset();
      document.getElementById('addProductModal').classList.remove('show');
      this.loadProducts();
    } catch (error) {
      this.showNotification(error.message || 'Error creating product', 'error');
    }
  }

  async editProduct(productId) {
    // Load product and show edit modal
    // Implementation for editing
    console.log('Edit product:', productId);
  }

  async deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await this.api.deleteProduct(productId);
        this.showNotification('Product deleted', 'success');
        this.loadProducts();
      } catch (error) {
        this.showNotification(error.message || 'Error deleting product', 'error');
      }
    }
  }

  updateOrderStatus(orderId) {
    const modal = document.getElementById('updateOrderModal');
    document.getElementById('orderId').value = orderId;
    modal.classList.add('show');

    const form = document.getElementById('updateOrderForm');
    form.onsubmit = async (e) => {
      e.preventDefault();
      const status = document.getElementById('newStatus').value;
      try {
        await this.api.updateOrderStatus(orderId, status);
        this.showNotification('Order status updated', 'success');
        modal.classList.remove('show');
        this.loadOrders();
      } catch (error) {
        this.showNotification(error.message || 'Error updating order', 'error');
      }
    };
  }

  async logout() {
    try {
      await this.api.logout();
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      background: ${type === 'error' ? '#e74c3c' : type === 'success' ? '#27ae60' : '#3498db'};
      color: white;
      border-radius: 8px;
      z-index: 10000;
      animation: slideIn 0.3s ease;
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 4000);
  }
}

// Initialize when page loads
let branchAdmin;
document.addEventListener('DOMContentLoaded', () => {
  branchAdmin = new BranchAdminDashboard();
});
