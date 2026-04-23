# 🔌 API Documentation - Simba Supermarket Backend

Base URL: `http://localhost:5000/api`

## 📋 Table of Contents
- [Authentication](#authentication)
- [Super Admin Endpoints](#super-admin-endpoints)
- [Branch Admin Endpoints](#branch-admin-endpoints)
- [Public Endpoints](#public-endpoints)
- [Error Handling](#error-handling)

---

## 🔐 Authentication

### Login
Create a new session and get JWT token.

```
POST /auth/login
Content-Type: application/json

{
  "email": "superadmin@simba.com",
  "password": "Change@123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Super Administrator",
    "email": "superadmin@simba.com",
    "role": "super_admin",
    "isActive": true,
    "lastLogin": "2024-01-20T10:30:00Z"
  }
}
```

### Register
Create a new user account (typically for super admin creating branch admins).

```
POST /auth/register
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "John Doe",
  "email": "john@simba.com",
  "password": "SecurePass123!",
  "role": "admin",
  "branch": "507f1f77bcf86cd799439011"
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

### Get Current User
Get logged-in user details.

```
GET /auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Super Administrator",
    "email": "superadmin@simba.com",
    "role": "super_admin",
    "branch": null,
    "phone": "",
    "avatar": "https://via.placeholder.com/150",
    "isActive": true,
    "lastLogin": "2024-01-20T10:30:00Z",
    "createdAt": "2024-01-15T08:00:00Z"
  }
}
```

### Logout
End the current session.

```
POST /auth/logout
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 👑 Super Admin Endpoints

**Note**: All super admin endpoints require `Authorization: Bearer <token>` header and `role: super_admin`

### Get Dashboard
Get overall system statistics and recent orders.

```
GET /super-admin/dashboard
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "stats": {
    "totalBranches": 5,
    "totalAdmins": 8,
    "totalOrders": 245,
    "totalProducts": 1250,
    "totalRevenue": 45750.50
  },
  "recentOrders": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "orderId": "ORD-1705758000000",
      "branch": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Main Store"
      },
      "totalAmount": 125.50,
      "status": "completed",
      "createdAt": "2024-01-20T10:30:00Z"
    }
  ],
  "branchPerformance": [...]
}
```

### Get All Branches
List all supermarket branches.

```
GET /super-admin/branches
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 5,
  "branches": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Main Store",
      "location": "Downtown",
      "address": {
        "street": "123 Main St",
        "city": "Springfield",
        "state": "IL",
        "postalCode": "62701",
        "country": "USA"
      },
      "phone": "217-555-0123",
      "email": "main@simba.com",
      "manager": { ... },
      "status": "active",
      "totalSales": 15000,
      "employees": 25,
      "revenue": 15000,
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ]
}
```

### Create Branch
Add a new branch.

```
POST /super-admin/branches
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Downtown Store",
  "location": "Main Street",
  "address": {
    "street": "123 Main Street",
    "city": "Springfield",
    "state": "IL",
    "postalCode": "62701",
    "country": "USA"
  },
  "phone": "217-555-0123",
  "email": "downtown@simba.com"
}

Response (201):
{
  "success": true,
  "message": "Branch created successfully",
  "branch": { ... }
}
```

### Update Branch
Modify branch information.

```
PUT /super-admin/branches/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Downtown Store",
  "location": "Main Street",
  "status": "active"
}

Response (200):
{
  "success": true,
  "message": "Branch updated successfully",
  "branch": { ... }
}
```

### Delete Branch
Remove a branch (also deletes associated admins).

```
DELETE /super-admin/branches/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Branch deleted successfully"
}
```

### Create Branch Admin
Add a new admin for a specific branch.

```
POST /super-admin/admins
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Manager",
  "email": "john.manager@simba.com",
  "password": "SecurePass123!",
  "branch": "507f1f77bcf86cd799439012"
}

Response (201):
{
  "success": true,
  "message": "Branch admin created successfully",
  "admin": {
    "_id": "507f1f77bcf86cd799439013",
    "name": "John Manager",
    "email": "john.manager@simba.com",
    "role": "admin",
    "branch": "507f1f77bcf86cd799439012",
    "isActive": true
  }
}
```

### Get All Admins
List all branch administrators.

```
GET /super-admin/admins
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 8,
  "admins": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Manager",
      "email": "john.manager@simba.com",
      "role": "admin",
      "branch": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Main Store"
      },
      "isActive": true,
      "lastLogin": "2024-01-20T10:00:00Z",
      "createdAt": "2024-01-15T08:00:00Z"
    }
  ]
}
```

### Deactivate Admin
Disable an admin account.

```
PUT /super-admin/admins/:id/deactivate
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Admin deactivated successfully",
  "admin": {
    "_id": "507f1f77bcf86cd799439013",
    "isActive": false
  }
}
```

### Get Analytics
Get system-wide analytics and reports.

```
GET /super-admin/analytics?period=30
Authorization: Bearer <token>

Query Parameters:
- period: 7, 30, or 90 (days)

Response (200):
{
  "success": true,
  "analytics": {
    "revenueData": [
      {
        "_id": "2024-01-15",
        "revenue": 2500.50,
        "orders": 15
      }
    ],
    "topBranches": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "totalSales": 15000,
        "orderCount": 125,
        "branch": [ { "name": "Main Store" } ]
      }
    ],
    "period": 30
  }
}
```

---

## 🏪 Branch Admin Endpoints

**Note**: All branch admin endpoints require authorization and are limited to the admin's assigned branch.

### Get Branch Dashboard
Get branch-specific statistics.

```
GET /branch-admin/dashboard
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "dashboard": {
    "branch": {
      "name": "Main Store",
      "location": "Downtown",
      "status": "active"
    },
    "stats": {
      "totalProducts": 250,
      "totalOrders": 125,
      "totalRevenue": 8500.50,
      "pendingOrders": 3,
      "lowStockProducts": 5
    },
    "pendingOrders": [ ... ],
    "lowStockProducts": [ ... ]
  }
}
```

### Add Product
Add a new product to the branch.

```
POST /branch-admin/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Organic Apples",
  "description": "Fresh organic apples",
  "category": "Groceries",
  "price": 3.99,
  "quantity": 100,
  "sku": "APP-001"
}

Response (201):
{
  "success": true,
  "message": "Product added successfully",
  "product": {
    "_id": "507f1f77bcf86cd799439014",
    "name": "Organic Apples",
    "category": "Groceries",
    "price": 3.99,
    "quantity": 100,
    "sku": "APP-001",
    "status": "active",
    "branch": "507f1f77bcf86cd799439012"
  }
}
```

### Get Products
List all products for the branch.

```
GET /branch-admin/products?status=active
Authorization: Bearer <token>

Query Parameters:
- status: active, inactive, discontinued (optional)

Response (200):
{
  "success": true,
  "count": 250,
  "products": [ ... ]
}
```

### Update Product
Modify product information.

```
PUT /branch-admin/products/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Organic Apples",
  "price": 4.49,
  "quantity": 85,
  "status": "active"
}

Response (200):
{
  "success": true,
  "message": "Product updated successfully",
  "product": { ... }
}
```

### Delete Product
Remove a product.

```
DELETE /branch-admin/products/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Product deleted successfully"
}
```

### Get Orders
List all orders for the branch.

```
GET /branch-admin/orders?status=pending&page=1
Authorization: Bearer <token>

Query Parameters:
- status: pending, completed, cancelled, refunded (optional)
- page: Page number (default: 1)

Response (200):
{
  "success": true,
  "count": 10,
  "total": 125,
  "page": 1,
  "pages": 13,
  "orders": [ ... ]
}
```

### Update Order Status
Change the status of an order.

```
PUT /branch-admin/orders/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}

Response (200):
{
  "success": true,
  "message": "Order status updated",
  "order": { ... }
}
```

### Get Branch Analytics
Get analytics specific to the branch.

```
GET /branch-admin/analytics?period=30
Authorization: Bearer <token>

Query Parameters:
- period: 7, 30, or 90 (days)

Response (200):
{
  "success": true,
  "analytics": {
    "revenueData": [ ... ],
    "topProducts": [ ... ],
    "period": 30
  }
}
```

---

## 🛍️ Public Endpoints

No authentication required for these endpoints.

### Get All Products
List all active products.

```
GET /products?category=Groceries
Query Parameters:
- category: Filter by category (optional)
- status: active, inactive, discontinued

Response (200):
{
  "success": true,
  "count": 150,
  "products": [ ... ]
}
```

### Get Single Product

```
GET /products/:id

Response (200):
{
  "success": true,
  "product": { ... }
}
```

### Create Order
Place a new order.

```
POST /orders
Content-Type: application/json

{
  "branch": "507f1f77bcf86cd799439012",
  "items": [
    {
      "product": "507f1f77bcf86cd799439014",
      "quantity": 2
    }
  ],
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "555-0123",
  "paymentMethod": "card"
}

Response (201):
{
  "success": true,
  "message": "Order created successfully",
  "order": {
    "_id": "507f1f77bcf86cd799439015",
    "orderId": "ORD-1705758000000",
    "branch": "507f1f77bcf86cd799439012",
    "items": [ ... ],
    "totalAmount": 7.98,
    "status": "pending"
  }
}
```

### Get All Orders

```
GET /orders?branch=507f1f77bcf86cd799439012&status=completed

Query Parameters:
- branch: Filter by branch (optional)
- status: Filter by status (optional)
- page: Page number (default: 1)

Response (200):
{
  "success": true,
  "count": 20,
  "total": 245,
  "page": 1,
  "pages": 13,
  "orders": [ ... ]
}
```

### Get Analytics

```
GET /analytics?period=30

Query Parameters:
- period: 7, 30, 90 (days)
- branch: Filter by branch (optional)

Response (200):
{
  "success": true,
  "analytics": {
    "revenueData": [ ... ],
    "stats": {
      "totalRevenue": 45750.50,
      "totalOrders": 245,
      "avgOrderValue": 186.73
    },
    "period": 30
  }
}
```

---

## ❌ Error Handling

All errors return JSON with proper HTTP status codes.

### Error Response Format
```json
{
  "success": false,
  "message": "Error description"
}
```

### Common Error Codes

| Status | Error | Solution |
|--------|-------|----------|
| 400 | Missing required fields | Check request body |
| 401 | No token provided | Add Authorization header |
| 401 | Invalid token | Login again |
| 403 | Unauthorized | Insufficient permissions |
| 404 | Not found | Check resource ID |
| 500 | Server error | Check server logs |

### Example Error Response
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## 📝 Request/Response Examples

### Using Fetch API
```javascript
// Login
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'superadmin@simba.com',
    password: 'Change@123'
  })
});
const data = await response.json();
const token = data.token;

// Get dashboard
const dashResponse = await fetch('http://localhost:5000/api/super-admin/dashboard', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const dashboard = await dashResponse.json();
```

### Using Postman
1. POST http://localhost:5000/api/auth/login
2. Copy token from response
3. Add header: `Authorization: Bearer <token>`
4. Use in subsequent requests

---

## 🔄 Rate Limiting
Currently no rate limiting. Add in production for security.

## 📚 Related Documentation
- [SETUP_GUIDE.md](SETUP_GUIDE.md) - Setup instructions
- [README.md](README.md) - Project overview
