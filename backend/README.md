# 🦁 Simba Supermarket - Multi-Branch Admin Dashboard

A complete, production-ready Node.js backend with professional admin dashboards for managing multiple supermarket branches. Features include super admin dashboard, branch-specific dashboards, inventory management, order tracking, and analytics.

## ✨ Key Features

### 📊 Super Admin Dashboard
- Real-time system statistics (branches, admins, orders, revenue)
- Complete branch management (CRUD operations)
- Branch admin account creation and management
- System-wide analytics and reports
- Order monitoring across all branches
- Branch performance comparison

### 🏪 Branch Admin Dashboard  
- Branch-specific dashboard with KPIs
- Complete product management with inventory tracking
- Order management with status updates
- Branch-specific analytics and sales reports
- Low-stock alerts
- Revenue tracking

### 🔐 Security Features
- JWT-based authentication
- Password hashing with bcryptjs
- Role-based access control (Super Admin / Admin)
- Secure API endpoints
- Environment variable configuration
- CORS protection

### 📈 Analytics & Reporting
- Revenue trends (7, 30, 90 days)
- Top-selling products
- Branch performance metrics
- Order analytics
- Inventory insights
- Exportable reports

## 🚀 Quick Start

### Prerequisites
- **Node.js** 14+
- **MongoDB** 4.4+ (local or Atlas)
- **npm** or yarn

### Installation

**Option 1: Automatic Setup (Recommended for Windows)**
```bash
# Windows PowerShell
powershell -ExecutionPolicy Bypass -File setup.ps1

# Or Windows Command Prompt
setup.bat

# Or Node.js setup
node setup.js
```

**Option 2: Manual Setup**
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Initialize database
npm run init

# Start server
npm run dev
```

### Access the Application
- **Login**: http://localhost:5000/login.html
- **Super Admin**: superadmin@simba.com / Change@123
- **Super Admin Dashboard**: http://localhost:5000/dashboards/super-admin.html
- **Branch Admin Dashboard**: http://localhost:5000/dashboards/branch-admin.html

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Detailed setup instructions for all platforms |
| [API_DOCS.md](API_DOCS.md) | Complete API endpoint documentation |
| [README.md](README.md) | This file - project overview |

## 📂 Project Structure

```
backend/
├── src/
│   ├── models/           # Database schemas
│   │   ├── User.js       # User model (super admin, admin)
│   │   ├── Branch.js     # Branch model
│   │   ├── Product.js    # Product model
│   │   └── Order.js      # Order model
│   ├── controllers/       # Business logic
│   │   ├── authController.js
│   │   ├── superAdminController.js
│   │   └── branchAdminController.js
│   ├── routes/            # API routes
│   │   ├── auth.js
│   │   ├── superAdmin.js
│   │   ├── branchAdmin.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── analytics.js
│   ├── middleware/        # Authentication & validation
│   │   └── auth.js
│   ├── config/
│   │   └── database.js
│   └── server.js          # Main entry point
├── public/
│   ├── dashboards/        # Dashboard HTML files
│   │   ├── super-admin.html
│   │   └── branch-admin.html
│   ├── js/                # Dashboard JavaScript
│   │   ├── api-client.js
│   │   ├── super-admin-dashboard.js
│   │   └── branch-admin-dashboard.js
│   ├── css/
│   │   └── dashboard.css
│   ├── login.html         # Login page
├── setup.js               # Setup script (Node.js)
├── setup.bat              # Setup script (Windows CMD)
├── setup.ps1              # Setup script (PowerShell)
├── init-db.js             # Database initialization
├── package.json
├── .env.example           # Environment template
├── .gitignore
├── README.md
├── SETUP_GUIDE.md
└── API_DOCS.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Current user info
- `POST /api/auth/logout` - User logout

### Super Admin Routes
- `GET /api/super-admin/dashboard` - Dashboard stats
- `GET/POST/PUT/DELETE /api/super-admin/branches` - Branch management
- `GET/POST/PUT /api/super-admin/admins` - Admin management
- `GET /api/super-admin/analytics` - System analytics

### Branch Admin Routes
- `GET /api/branch-admin/dashboard` - Branch dashboard
- `GET/POST/PUT/DELETE /api/branch-admin/products` - Product management
- `GET/PUT /api/branch-admin/orders` - Order management
- `GET /api/branch-admin/analytics` - Branch analytics

### Public Routes
- `GET /api/products` - List products
- `POST/GET /api/orders` - Order management
- `GET /api/analytics` - Public analytics

**Full API documentation**: [API_DOCS.md](API_DOCS.md)

## 💾 Database Models

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: 'super_admin' | 'admin',
  branch: ObjectId,
  phone: String,
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Branch
```javascript
{
  name: String,
  location: String,
  address: Object,
  phone: String,
  email: String,
  manager: ObjectId,
  status: 'active' | 'inactive' | 'maintenance',
  revenue: Number,
  totalSales: Number,
  employees: Number,
  timestamps: true
}
```

### Product
```javascript
{
  name: String,
  description: String,
  category: String,
  price: Number,
  quantity: Number,
  branch: ObjectId,
  sku: String (unique),
  status: 'active' | 'inactive' | 'discontinued',
  image: String,
  timestamps: true
}
```

### Order
```javascript
{
  orderId: String (unique),
  branch: ObjectId,
  items: Array,
  totalAmount: Number,
  customerName: String,
  customerEmail: String,
  customerPhone: String,
  status: 'pending' | 'completed' | 'cancelled' | 'refunded',
  paymentMethod: String,
  paymentStatus: String,
  notes: String,
  completedAt: Date,
  timestamps: true
}
```

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/simba_supermarket

# Authentication
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Super Admin Setup
SUPER_ADMIN_EMAIL=superadmin@simba.com
SUPER_ADMIN_PASSWORD=Change@123

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8080

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

## 🛠 Technology Stack

- **Runtime**: Node.js 14+
- **Framework**: Express.js 4.18+
- **Database**: MongoDB 4.4+ with Mongoose 7+
- **Authentication**: JWT + bcryptjs
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js
- **Security**: Helmet, CORS, environment variables
- **Development**: Nodemon for hot reload

## 📊 Dashboard Features

### Super Admin Dashboard
✅ System overview with key metrics
✅ Create/manage branches
✅ Create/manage branch admins
✅ Monitor all orders
✅ System-wide analytics
✅ Branch performance comparison
✅ Real-time statistics

### Branch Admin Dashboard
✅ Branch-specific KPIs
✅ Product inventory management
✅ Complete order lifecycle
✅ Branch analytics
✅ Low-stock alerts
✅ Revenue tracking
✅ Performance reports

## 🔄 Workflow

1. **Super Admin** logs in and creates branches
2. **Super Admin** creates branch admin accounts
3. **Branch Admins** log in to their branch dashboard
4. **Branch Admins** manage products and orders
5. **Super Admin** monitors overall performance
6. System tracks revenue, inventory, and orders

## 🚀 Development

### Running in Development
```bash
npm run dev
```
Server runs with auto-reload on file changes.

### Running in Production
```bash
npm start
```

### Initialize Database
```bash
npm run init
```

### Testing API
Use Postman, Insomnia, or the provided `api-client.js` library.

## 📈 Scaling & Deployment

### Production Checklist
- [ ] Change default JWT_SECRET
- [ ] Change default password
- [ ] Use MongoDB Atlas for production
- [ ] Enable HTTPS
- [ ] Setup proper CORS origins
- [ ] Enable rate limiting
- [ ] Setup error logging
- [ ] Configure backups
- [ ] Setup monitoring

### Deployment Options
- **Heroku**: `git push heroku main`
- **AWS Lambda/EC2**: Deploy Node.js container
- **DigitalOcean**: App Platform or Droplet
- **Azure**: App Service or Container Instances
- **Google Cloud**: Cloud Run or App Engine

## 🔒 Security Best Practices

1. **Change Default Credentials**
   - Login after setup
   - Go to Settings and change password

2. **Secure JWT Secret**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   Update JWT_SECRET in .env

3. **Database Security**
   - Use MongoDB Atlas with authentication
   - Restrict IP whitelist
   - Enable encryption at rest

4. **API Security**
   - All endpoints use HTTPS in production
   - JWT tokens expire after 7 days
   - Passwords are hashed with bcryptjs
   - Rate limiting recommended

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection failed | Check URI, ensure MongoDB is running |
| Port 5000 in use | Change PORT in .env |
| Dashboard loading... forever | Check browser console, verify token |
| Login fails | Reset with `npm run init` |
| Missing dependencies | Run `npm install` |

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for more troubleshooting.

## 📞 Support

- Check documentation: [SETUP_GUIDE.md](SETUP_GUIDE.md), [API_DOCS.md](API_DOCS.md)
- Review server logs in terminal
- Check browser console (F12) for client errors

## 🎯 Next Steps

1. ✅ Backend setup complete
2. → Create branches and admins
3. → Add products to inventory
4. → Process orders
5. → Monitor analytics
6. → Optional: Migrate frontend to React
7. → Optional: Add payment integration
8. → Optional: Deploy to production

## 📄 License

MIT License - Feel free to use in your projects

---

## 🎉 You're All Set!

**Start your server:**
```bash
npm run dev
```

**Access the dashboard:**
```
http://localhost:5000/login.html
```

**Login with:**
- Email: superadmin@simba.com
- Password: Change@123

**⚠️ Important: Change the password immediately after first login!**

Happy coding! 🚀

