# 🏗️ System Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    SIMBA SUPERMARKET ADMIN SYSTEM                       │
└─────────────────────────────────────────────────────────────────────────┘

                              ┌──────────────┐
                              │   USERS      │
                              │ (Browser)    │
                              └──────┬───────┘
                                     │
                  ┌──────────────────┼──────────────────┐
                  │                  │                  │
         ┌────────▼────────┐ ┌──────▼──────┐ ┌────────▼────────┐
         │  Super Admin    │ │   Browser   │ │  Branch Admin   │
         │  Login Page     │ │   Storage   │ │  Login Page     │
         └────────┬────────┘ └─────────────┘ └────────┬────────┘
                  │                                    │
                  └──────────────┬─────────────────────┘
                                 │
                          ┌──────▼──────┐
                          │  HTTP/HTTPS │
                          └──────┬──────┘
                                 │
                  ┌──────────────▼──────────────┐
                  │                             │
        ┌─────────▼─────────┐        ┌────────▼────────┐
        │   Express.js      │        │   Static Files  │
        │   REST API        │        │   (HTML/CSS/JS) │
        │   (Port 5000)     │        │                 │
        └─────────┬─────────┘        └────────┬────────┘
                  │                           │
          ┌───────┴───────┐                   │
          │               │                   │
    ┌─────▼──────┐  ┌────▼──────┐            │
    │ Auth       │  │ Middleware │            │
    │ Routes     │  │ (JWT)      │            │
    └─────┬──────┘  └────┬───────┘            │
          │              │                    │
    ┌─────▼───────────────▼─────┐             │
    │  Controllers              │             │
    │ - authController          │             │
    │ - superAdminController    │             │
    │ - branchAdminController   │             │
    └─────┬─────────────────────┘             │
          │                                   │
    ┌─────▼─────────────────────┐             │
    │  Routes/Endpoints         │             │
    │ - /api/auth               │             │
    │ - /api/super-admin        │             │
    │ - /api/branch-admin       │             │
    │ - /api/products           │             │
    │ - /api/orders             │             │
    │ - /api/analytics          │             │
    └─────┬─────────────────────┘             │
          │                                   │
    ┌─────▼──────────────────────┐            │
    │  Models (Mongoose)         │            │
    │ - User                     │            │
    │ - Branch                   │            │
    │ - Product                  │            │
    │ - Order                    │            │
    └─────┬──────────────────────┘            │
          │                                   │
          └──────────────┬────────────────────┘
                         │
                   ┌─────▼─────┐
                   │  MongoDB   │
                   │ Database   │
                   └───────────┘
```

## Request Flow Diagram

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
         │ 1. User Input
         │ (Login, Create, Update)
         ▼
┌─────────────────────────────┐
│  Frontend (HTML/CSS/JS)     │
│  - login.html               │
│  - super-admin.html         │
│  - branch-admin.html        │
└────────┬────────────────────┘
         │
         │ 2. HTTP Request
         │ (REST API Call)
         ▼
┌─────────────────────────────┐
│  Express.js Server          │
│  (Port 5000)                │
└────────┬────────────────────┘
         │
         │ 3. Route Matching
         ▼
┌─────────────────────────────┐
│  Routes (/src/routes)       │
│  - Identify endpoint        │
│  - Parse parameters         │
└────────┬────────────────────┘
         │
         │ 4. Middleware
         ▼
┌─────────────────────────────┐
│  Auth Middleware            │
│  - Verify JWT Token         │
│  - Check Permissions        │
│  - Validate User Role       │
└────────┬────────────────────┘
         │
         │ 5. Execute Logic
         ▼
┌─────────────────────────────┐
│  Controllers                │
│  - authController           │
│  - superAdminController     │
│  - branchAdminController    │
└────────┬────────────────────┘
         │
         │ 6. Database Operations
         ▼
┌─────────────────────────────┐
│  Mongoose Models            │
│  - Query builder            │
│  - Validation               │
│  - Schema definition        │
└────────┬────────────────────┘
         │
         │ 7. Database Access
         ▼
┌─────────────────────────────┐
│  MongoDB                    │
│  - Collections (Tables)     │
│  - Documents (Records)      │
│  - Indexes                  │
└────────┬────────────────────┘
         │
         │ 8. Return Data
         ▼
┌─────────────────────────────┐
│  Controller Response        │
│  - Format JSON              │
│  - Include Metadata         │
└────────┬────────────────────┘
         │
         │ 9. HTTP Response
         ▼
┌─────────────────────────────┐
│  Frontend JavaScript        │
│  - Parse Response           │
│  - Update UI                │
│  - Show Results             │
└────────┬────────────────────┘
         │
         │ 10. Display to User
         ▼
┌─────────────────────────────┐
│  User Sees Result           │
│  (Data, Charts, Forms)      │
└─────────────────────────────┘
```

## Authentication Flow

```
┌─────────────────┐
│  Login Page     │
└────────┬────────┘
         │
         │ Enter Email & Password
         ▼
┌─────────────────────────────┐
│  POST /api/auth/login       │
│  {email, password}          │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  authController.login()     │
│  1. Find user by email      │
│  2. Compare password        │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  bcryptjs.compare()         │
│  Hash & verify password     │
└────────┬────────────────────┘
         │
      Yes│
         ▼
┌─────────────────────────────┐
│  Generate JWT Token         │
│  Sign with JWT_SECRET       │
│  Expiration: 7 days         │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Return Response            │
│  {token, user, role}        │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Store Token (localStorage) │
└────────┬────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│  Redirect to Dashboard      │
│  Based on User Role         │
└─────────────────────────────┘
```

## Database Schema Relationships

```
┌──────────────┐
│    User      │
├──────────────┤
│ _id          │◄──────────────┐
│ name         │               │
│ email        │               │ One User per
│ password     │               │ Branch (Admin)
│ role         │               │
│ branch ──────┼──────────────►│
│ createdAt    │               │
└──────────────┘               │
                               │
                    ┌──────────▼──────────┐
                    │     Branch         │
                    ├────────────────────┤
                    │ _id                │
                    │ name               │
                    │ location           │
                    │ address            │
                    │ manager ───────────┼──► (refs User)
                    │ status             │
                    │ revenue            │
                    └────────┬───────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
         ┌──────────▼────────┐ ┌─────▼──────────┐
         │     Product       │ │     Order      │
         ├───────────────────┤ ├────────────────┤
         │ _id               │ │ _id            │
         │ name              │ │ orderId        │
         │ category          │ │ branch ────────┼──► (refs Branch)
         │ price             │ │ items          │
         │ quantity          │ │  - product ────┼──► (refs Product)
         │ branch ───────────┼─┤ totalAmount    │
         │ sku               │ │ customerName   │
         │ createdAt         │ │ status         │
         └───────────────────┘ └────────────────┘
```

## Role-Based Access Control (RBAC)

```
┌─────────────────────────────────────────────────────────┐
│              USER ROLES & PERMISSIONS                   │
└─────────────────────────────────────────────────────────┘

                    ┌─────────────┐
                    │  Super Admin│
                    └──────┬──────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   View All         Manage All         Access All
   Statistics       Branches           Dashboards
        │                  │                  │
        ├─ Dashboard    ├─ Create Branch    ├─ All Orders
        ├─ All Orders   ├─ Update Branch    ├─ Analytics
        └─ Analytics    └─ Delete Branch    └─ Settings
                           
        ┌──────────────────┐
        │  Manage Admins   │
        ├──────────────────┤
        ├─ Create Admin
        ├─ Deactivate
        └─ View All
```

```
┌─────────────────────────────────────────────────────────┐
│            BRANCH ADMIN (Role: 'admin')                 │
└─────────────────────────────────────────────────────────┘

        ┌──────────────────┐
        │ Branch Dashboard │
        └────────┬─────────┘
                 │
     ┌───────────┼───────────┐
     │           │           │
     ▼           ▼           ▼
┌─────────┐ ┌────────┐ ┌──────────┐
│Products │ │ Orders │ │Analytics │
├─────────┤ ├────────┤ ├──────────┤
│- Add    │ │- View  │ │- Branch  │
│- Update │ │- Update│ │  Revenue │
│- Delete │ │- Track │ │- Products│
│- Search │ │- Filter│ │- Reports │
└─────────┘ └────────┘ └──────────┘

Access Restrictions:
✓ Own branch data only
✓ Products from own branch
✓ Orders for own branch
✗ Cannot manage other branches
✗ Cannot create admins
✗ Cannot view system analytics
```

## API Endpoint Organization

```
┌──────────────────────────────────────────┐
│    API BASE: /api                        │
├──────────────────────────────────────────┤
│                                          │
│  ┌─ /auth (Public)                      │
│  │  ├─ POST   /login                    │
│  │  ├─ POST   /register                 │
│  │  ├─ GET    /me                       │
│  │  └─ POST   /logout                   │
│  │                                      │
│  ├─ /super-admin (Auth + Super Admin)   │
│  │  ├─ GET    /dashboard                │
│  │  ├─ GET    /branches                 │
│  │  ├─ POST   /branches                 │
│  │  ├─ PUT    /branches/:id             │
│  │  ├─ DELETE /branches/:id             │
│  │  ├─ GET    /admins                   │
│  │  ├─ POST   /admins                   │
│  │  ├─ PUT    /admins/:id/deactivate    │
│  │  └─ GET    /analytics                │
│  │                                      │
│  ├─ /branch-admin (Auth + Admin)        │
│  │  ├─ GET    /dashboard                │
│  │  ├─ GET    /products                 │
│  │  ├─ POST   /products                 │
│  │  ├─ PUT    /products/:id             │
│  │  ├─ DELETE /products/:id             │
│  │  ├─ GET    /orders                   │
│  │  ├─ PUT    /orders/:id/status        │
│  │  └─ GET    /analytics                │
│  │                                      │
│  ├─ /products (Public)                  │
│  │  ├─ GET    / (list products)         │
│  │  └─ GET    /:id (single product)     │
│  │                                      │
│  ├─ /orders (Public)                    │
│  │  ├─ POST   / (create order)          │
│  │  ├─ GET    / (list orders)           │
│  │  └─ GET    /:id (single order)       │
│  │                                      │
│  └─ /analytics (Public)                 │
│     └─ GET    / (system analytics)      │
│                                          │
└──────────────────────────────────────────┘
```

## Data Flow: Creating an Order

```
1. Customer selects products and creates order

    ┌──────────────────┐
    │  Frontend        │
    │  POST /api/orders│
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Validate Request     │
    │ - branch ID          │
    │ - item array         │
    │ - customer info      │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ For Each Item        │
    │ 1. Find Product      │
    │ 2. Check Stock       │
    │ 3. Calc Subtotal     │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Create Order         │
    │ - Set Items          │
    │ - Calculate Total    │
    │ - Set Status: pending│
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Deduct Stock         │
    │ - For each product   │
    │ - Update quantity    │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Return Order         │
    │ with order details   │
    └────────┬─────────────┘
             │
             ▼
    ┌──────────────────────┐
    │ Frontend Updates UI  │
    │ Shows order success  │
    └──────────────────────┘
```

## Deployment Architecture (Recommended)

```
┌────────────────────────────────────────────────────────┐
│                  PRODUCTION SETUP                      │
└────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │    Users     │
                    │  (Internet)  │
                    └──────┬───────┘
                           │
                    ┌──────▼───────┐
                    │  HTTPS/SSL   │
                    │  (Port 443)  │
                    └──────┬───────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
         ┌───▼────┐ ┌─────▼────┐ ┌─────▼────┐
         │Server 1│ │Server 2  │ │Server 3  │
         └───┬────┘ └────┬─────┘ └────┬─────┘
             │            │            │
             └────────────┼────────────┘
                          │
                    ┌─────▼────────┐
                    │  Load        │
                    │  Balancer    │
                    └─────┬────────┘
                          │
                   ┌──────▼──────┐
                   │ MongoDB     │
                   │ Cluster     │
                   │ (Atlas)     │
                   └─────────────┘
```

---

This architecture ensures:
- ✅ Scalability
- ✅ Security
- ✅ Reliability
- ✅ Maintainability
- ✅ Performance
