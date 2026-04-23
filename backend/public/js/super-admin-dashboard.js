// Super Admin Dashboard
class SuperAdminDashboard {
  constructor() {
    this.api = apiClient;
    this.currentUser = null;
    this.revenueChart = null;
    this.branchRevenueChart = null;
    this.init();
  }

  async init() {
    try {
      // Check authentication
      const user = await this.api.getCurrentUser();
      this.currentUser = user.user;

      // Update user info
      document.getElementById('userName').textContent = this.currentUser.name;
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

    // Add Branch
    document.getElementById('addBranchBtn')?.addEventListener('click', () => this.showBranchModal());
    document.getElementById('branchForm')?.addEventListener('submit', (e) => this.createBranch(e));

    // Add Admin
    document.getElementById('addAdminBtn')?.addEventListener('click', () => this.showAdminModal());
    document.getElementById('adminForm')?.addEventListener('submit', (e) => this.createAdmin(e));

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
      'branches': 'Manage Branches',
      'admins': 'Branch Admins',
      'analytics': 'Analytics & Reports',
      'settings': 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName] || 'Dashboard';

    // Show/hide sections
    document.querySelectorAll('.content-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(sectionName)?.classList.add('active');

    // Load section data
    if (sectionName === 'branches') {
      this.loadBranches();
    } else if (sectionName === 'admins') {
      this.loadAdmins();
    } else if (sectionName === 'analytics') {
      this.loadAnalytics();
    }
  }

  async loadDashboard() {
    try {
      const response = await this.api.getSuperAdminDashboard();
      const { stats, recentOrders, branchPerformance } = response;

      // Update stats
      document.getElementById('totalBranches').textContent = stats.totalBranches;
      document.getElementById('totalAdmins').textContent = stats.totalAdmins;
      document.getElementById('totalOrders').textContent = stats.totalOrders;
      document.getElementById('totalRevenue').textContent = `$${stats.totalRevenue.toFixed(2)}`;

      // Update recent orders table
      const ordersTable = document.getElementById('ordersTable');
      if (recentOrders.length > 0) {
        ordersTable.innerHTML = recentOrders.map(order => `
          <tr>
            <td>${order.orderId}</td>
            <td>${order.branch?.name || 'N/A'}</td>
            <td>$${order.totalAmount.toFixed(2)}</td>
            <td><span class="status-${order.status}">${order.status}</span></td>
            <td>${new Date(order.createdAt).toLocaleDateString()}</td>
          </tr>
        `).join('');
      } else {
        ordersTable.innerHTML = '<tr><td colspan="5">No orders yet</td></tr>';
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      this.showNotification('Error loading dashboard', 'error');
    }
  }

  async loadBranches() {
    try {
      const response = await this.api.getBranches();
      const grid = document.getElementById('branchesGrid');

      if (response.branches.length > 0) {
        grid.innerHTML = response.branches.map(branch => `
          <div class="branch-card">
            <h3>${branch.name}</h3>
            <p><strong>Location:</strong> ${branch.location}</p>
            <p><strong>Phone:</strong> ${branch.phone || 'N/A'}</p>
            <p><strong>Email:</strong> ${branch.email || 'N/A'}</p>
            <span class="status ${branch.status}">${branch.status}</span>
            <div style="margin-top: 15px; display: flex; gap: 10px;">
              <button class="btn btn-primary" onclick="superAdmin.editBranch('${branch._id}')">Edit</button>
              <button class="btn btn-danger" onclick="superAdmin.deleteBranch('${branch._id}')">Delete</button>
            </div>
          </div>
        `).join('');
      } else {
        grid.innerHTML = '<p>No branches found</p>';
      }
    } catch (error) {
      console.error('Error loading branches:', error);
      this.showNotification('Error loading branches', 'error');
    }
  }

  async loadAdmins() {
    try {
      const response = await this.api.getAdmins();
      const table = document.getElementById('adminsTable');

      if (response.admins.length > 0) {
        table.innerHTML = response.admins.map(admin => `
          <tr>
            <td>${admin.name}</td>
            <td>${admin.email}</td>
            <td>${admin.branch?.name || 'N/A'}</td>
            <td><span class="status ${admin.isActive ? 'active' : 'inactive'}">${admin.isActive ? 'Active' : 'Inactive'}</span></td>
            <td>${admin.lastLogin ? new Date(admin.lastLogin).toLocaleDateString() : 'Never'}</td>
            <td>
              <button class="btn btn-danger" onclick="superAdmin.deactivateAdmin('${admin._id}')">Deactivate</button>
            </td>
          </tr>
        `).join('');
      } else {
        table.innerHTML = '<tr><td colspan="6">No admins found</td></tr>';
      }

      // Populate branch select in admin modal
      const branches = await this.api.getBranches();
      const select = document.getElementById('adminBranch');
      select.innerHTML = '<option value="">Select Branch</option>';
      branches.branches.forEach(branch => {
        select.innerHTML += `<option value="${branch._id}">${branch.name}</option>`;
      });
    } catch (error) {
      console.error('Error loading admins:', error);
      this.showNotification('Error loading admins', 'error');
    }
  }

  async loadAnalytics(period = '30') {
    try {
      const response = await this.api.getSuperAdminAnalytics(period);
      const { revenueData } = response.analytics;

      // Destroy existing chart
      if (this.revenueChart) {
        this.revenueChart.destroy();
      }

      // Create revenue chart
      const ctx = document.getElementById('revenueChart')?.getContext('2d');
      if (ctx) {
        this.revenueChart = new Chart(ctx, {
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
              legend: {
                display: true,
                position: 'top'
              }
            }
          }
        });
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    }
  }

  showBranchModal() {
    document.getElementById('addBranchModal').classList.add('show');
  }

  showAdminModal() {
    document.getElementById('addAdminModal').classList.add('show');
    this.loadAdmins(); // To populate branch select
  }

  async createBranch(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('branchName').value,
      location: document.getElementById('branchLocation').value,
      phone: document.getElementById('branchPhone').value,
      email: document.getElementById('branchEmail').value,
      address: {
        street: document.getElementById('branchAddress').value
      }
    };

    try {
      await this.api.createBranch(data);
      this.showNotification('Branch created successfully', 'success');
      document.getElementById('branchForm').reset();
      document.getElementById('addBranchModal').classList.remove('show');
      this.loadBranches();
    } catch (error) {
      this.showNotification(error.message || 'Error creating branch', 'error');
    }
  }

  async createAdmin(e) {
    e.preventDefault();

    const data = {
      name: document.getElementById('adminName').value,
      email: document.getElementById('adminEmail').value,
      password: document.getElementById('adminPassword').value,
      branch: document.getElementById('adminBranch').value
    };

    try {
      await this.api.createBranchAdmin(data);
      this.showNotification('Admin created successfully', 'success');
      document.getElementById('adminForm').reset();
      document.getElementById('addAdminModal').classList.remove('show');
      this.loadAdmins();
    } catch (error) {
      this.showNotification(error.message || 'Error creating admin', 'error');
    }
  }

  async deactivateAdmin(adminId) {
    if (confirm('Are you sure you want to deactivate this admin?')) {
      try {
        await this.api.deactivateAdmin(adminId);
        this.showNotification('Admin deactivated', 'success');
        this.loadAdmins();
      } catch (error) {
        this.showNotification(error.message || 'Error deactivating admin', 'error');
      }
    }
  }

  async deleteBranch(branchId) {
    if (confirm('Are you sure you want to delete this branch? This will also delete all associated admins.')) {
      try {
        await this.api.deleteBranch(branchId);
        this.showNotification('Branch deleted', 'success');
        this.loadBranches();
      } catch (error) {
        this.showNotification(error.message || 'Error deleting branch', 'error');
      }
    }
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
let superAdmin;
document.addEventListener('DOMContentLoaded', () => {
  superAdmin = new SuperAdminDashboard();
});
