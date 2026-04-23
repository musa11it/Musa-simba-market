# 🚀 Complete Setup Guide - Simba Supermarket Backend

## System Requirements

- **Node.js**: v14 or higher
- **npm**: v6 or higher  
- **MongoDB**: v4.4 or higher (local or MongoDB Atlas)
- **Windows/Mac/Linux**: Any OS with Node.js support

## Step-by-Step Installation

### 1️⃣ Install Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express (web framework)
- mongoose (database)
- jsonwebtoken (authentication)
- bcryptjs (password encryption)
- cors (cross-origin requests)
- helmet (security)
- dotenv (environment variables)

### 2️⃣ Setup MongoDB

#### Option A: Local MongoDB (Windows)
```powershell
# Download MongoDB Community Edition from mongodb.com
# Install and start MongoDB service
# Connection string: mongodb://localhost:27017/simba_supermarket
```

#### Option B: MongoDB Atlas (Recommended for Production)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/simba_supermarket`

### 3️⃣ Configure Environment

```bash
# Copy example environment file
cp .env.example .env

# Edit .env with your settings
```

Edit `.env` file:

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/simba_supermarket
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/simba_supermarket

# Security
JWT_SECRET=your_super_secret_key_change_this_in_production
JWT_EXPIRE=7d

# Super Admin
SUPER_ADMIN_EMAIL=superadmin@simba.com
SUPER_ADMIN_PASSWORD=Change@123

# CORS
CORS_ORIGIN=http://localhost:3000,http://localhost:8080

# File Upload
MAX_FILE_SIZE=5242880
UPLOAD_PATH=./uploads
```

### 4️⃣ Initialize Database

```bash
# This creates super admin and sample data
npm run init
```

Or setup in one command:
```bash
npm run setup
```

### 5️⃣ Start the Server

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Production Mode**:
```bash
npm start
```

You should see:
```
✅ MongoDB Connected: localhost
🚀 Server running on port 5000
```

## 🌐 Access the Dashboard

### Login Page
```
http://localhost:5000/login.html
```

### Default Credentials
- **Email**: superadmin@simba.com
- **Password**: Change@123

### Super Admin Dashboard
After login with super admin account:
```
http://localhost:5000/dashboards/super-admin.html
```

### Branch Admin Dashboard
After login with branch admin account:
```
http://localhost:5000/dashboards/branch-admin.html
```

## 📊 API Base URL

```
http://localhost:5000/api
```

All API endpoints are prefixed with `/api/`

## 🔑 API Testing with Postman

### 1. Login
```
POST http://localhost:5000/api/auth/login
Body (JSON):
{
  "email": "superadmin@simba.com",
  "password": "Change@123"
}
```

### 2. Copy the token from response
In subsequent requests, add to Headers:
```
Authorization: Bearer <your_token_here>
```

### 3. Test Super Admin Endpoints
```
GET http://localhost:5000/api/super-admin/dashboard
Authorization: Bearer <token>
```

## 📂 Project Structure

```
backend/
├── src/
│   ├── models/
│   │   ├── User.js           # User schema (super admin, admin)
│   │   ├── Branch.js         # Branch schema
│   │   ├── Product.js        # Product schema
│   │   └── Order.js          # Order schema
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── superAdminController.js
│   │   └── branchAdminController.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── superAdmin.js
│   │   ├── branchAdmin.js
│   │   ├── products.js
│   │   ├── orders.js
│   │   └── analytics.js
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   ├── config/
│   │   └── database.js
│   └── server.js             # Main entry point
├── public/
│   ├── dashboards/
│   │   ├── super-admin.html
│   │   └── branch-admin.html
│   ├── js/
│   │   ├── api-client.js
│   │   ├── super-admin-dashboard.js
│   │   └── branch-admin-dashboard.js
│   ├── css/
│   │   └── dashboard.css
│   └── login.html
├── init-db.js                # Database initialization
├── package.json
├── .env.example
└── README.md
```

## 🎯 Common Tasks

### Create a New Branch

1. Login as Super Admin
2. Go to "Branches" section
3. Click "+ Add Branch"
4. Fill in:
   - Branch Name
   - Location
   - Phone
   - Email
   - Address
5. Click "Create Branch"

### Create Branch Admin

1. Login as Super Admin
2. Go to "Branch Admins" section
3. Click "+ Create Admin"
4. Fill in:
   - Admin Name
   - Email
   - Password
   - Select Branch
5. Click "Create Admin"
6. Share credentials with the admin

### Login as Branch Admin

1. Go to http://localhost:5000/login.html
2. Use the credentials provided by super admin
3. Access the branch admin dashboard

### Add Products

1. Login as Branch Admin
2. Go to "Products" section
3. Click "+ Add Product"
4. Fill in:
   - Product Name
   - SKU (unique identifier)
   - Category
   - Price
   - Quantity
   - Description
5. Click "Add Product"

## 🆘 Troubleshooting

### Error: Cannot find module 'mongoose'
**Solution**: Run `npm install` again

### Error: MongoDB connection failed
**Solution**:
- Check if MongoDB is running
- Verify MONGODB_URI in .env
- For Atlas: Check IP whitelist and connection string

### Error: Port 5000 already in use
**Solution**: 
```bash
# Change PORT in .env or use different port
npm start -- --port 3000
```

### Dashboard shows "Loading..." forever
**Solution**:
- Check browser console (F12) for errors
- Ensure API_BASE_URL matches your server URL
- Check if token is stored in localStorage
- Try clearing browser cache

### Cannot login with credentials
**Solution**:
- Verify email and password in .env
- Run `npm run init` to reset super admin
- Check MongoDB is connected

## 🔒 Security Best Practices

### Change Default Credentials
```
1. Login with default super admin
2. Go to Settings
3. Change password immediately
```

### Update JWT Secret
In `.env`, replace:
```env
JWT_SECRET=use-a-long-random-string-here
```

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Environment Variables
- Never commit `.env` to git
- Use `.env.example` as template
- Keep JWT_SECRET secure

## 📈 Next Steps

1. **Testing**: Use Postman or Insomnia to test API
2. **Customize**: Update branch information and branding
3. **Add Admins**: Create accounts for branch managers
4. **Setup Inventory**: Add products for each branch
5. **Monitor Analytics**: Track sales and branch performance

## 🚀 Deploy to Production

### Heroku Deployment
```bash
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret

# Deploy
git push heroku main
```

### AWS Lambda / EC2
1. Deploy Node.js server
2. Update MONGODB_URI
3. Update CORS_ORIGIN for production domain

## 📞 Support

### Check Logs
```bash
# In development, errors show in terminal
npm run dev

# In production, check server logs
```

### Enable Debug Mode
Add to your code:
```javascript
DEBUG=* npm run dev
```

## 📚 Additional Resources

- MongoDB Docs: https://docs.mongodb.com/
- Express.js: https://expressjs.com/
- JWT: https://jwt.io/
- Node.js: https://nodejs.org/

---

**Congratulations! 🎉 Your backend is ready to use!**

Start building amazing features for your supermarket management system!
