# 🚀 Quick Reference Card

## 📍 Important URLs

| Purpose | URL |
|---------|-----|
| Login Page | http://localhost:5000/login.html |
| Super Admin Dashboard | http://localhost:5000/dashboards/super-admin.html |
| Branch Admin Dashboard | http://localhost:5000/dashboards/branch-admin.html |
| API Base | http://localhost:5000/api |
| Health Check | http://localhost:5000/health |

## 🔑 Default Credentials

```
Email: superadmin@simba.com
Password: Change@123
```

⚠️ **Change immediately after first login!**

## ⚡ Common Commands

```bash
# Install dependencies
npm install

# Start in development
npm run dev

# Start in production
npm start

# Initialize database
npm run init

# Full setup
npm run setup

# Quick setup (Windows)
powershell -ExecutionPolicy Bypass -File setup.ps1
```

## 📚 Documentation Files

| Document | Purpose |
|----------|---------|
| [README.md](README.md) | Project overview |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Setup instructions |
| [API_DOCS.md](API_DOCS.md) | API endpoints |
| [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md) | What's included |

## 🔌 Most Used API Endpoints

```bash
# Login
POST /api/auth/login

# Get Dashboard (Super Admin)
GET /api/super-admin/dashboard

# Get Dashboard (Branch Admin)
GET /api/branch-admin/dashboard

# Create Branch
POST /api/super-admin/branches

# Create Branch Admin
POST /api/super-admin/admins

# Add Product
POST /api/branch-admin/products

# Get Orders
GET /api/branch-admin/orders

# Get Analytics
GET /api/super-admin/analytics
```

## 🗂️ File Structure

```
backend/
├── src/               → Backend code
│   ├── models/        → Database schemas
│   ├── controllers/    → Business logic
│   ├── routes/        → API endpoints
│   └── middleware/    → Authentication
├── public/            → Frontend files
│   ├── dashboards/    → HTML dashboards
│   ├── js/            → JavaScript logic
│   ├── css/           → Stylesheets
│   └── login.html     → Login page
└── docs/              → Documentation
```

## ⚙️ Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/simba_supermarket
JWT_SECRET=your_secret_key
SUPER_ADMIN_EMAIL=superadmin@simba.com
SUPER_ADMIN_PASSWORD=Change@123
```

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| MongoDB not connecting | Start MongoDB or check connection string |
| Port 5000 in use | Change PORT in .env |
| Dashboard loads forever | Check browser console for errors |
| Cannot login | Run `npm run init` to reset |

## 🔒 Security Checklist

- [ ] Changed default password
- [ ] Updated JWT_SECRET
- [ ] Configured CORS_ORIGIN
- [ ] Using HTTPS in production
- [ ] Set strong database password
- [ ] Enabled backups
- [ ] Configured firewall

## 📊 Dashboard Navigation

### Super Admin
- Dashboard → View statistics
- Branches → Manage locations
- Admins → Create/manage admins
- Analytics → View reports
- Settings → Change password

### Branch Admin
- Dashboard → Branch KPIs
- Products → Manage inventory
- Orders → Process orders
- Analytics → Branch reports
- Settings → Change password

## 💡 Pro Tips

1. **Fast Setup**: Use `npm run setup` for automatic setup
2. **Testing**: Use Postman with the API endpoints
3. **Development**: Use `npm run dev` for hot reload
4. **Debugging**: Check browser console (F12) for errors
5. **Logs**: Server logs show in terminal

## 🎯 Workflow

1. **Setup** → Run npm install and init
2. **Login** → Use default credentials
3. **Create Branch** → Add branch location
4. **Create Admin** → Create branch manager
5. **Add Products** → Populate inventory
6. **Process Orders** → Handle customer orders
7. **Monitor Analytics** → Track performance

## 📞 Need Help?

1. Check [SETUP_GUIDE.md](SETUP_GUIDE.md) for installation
2. Read [API_DOCS.md](API_DOCS.md) for API details
3. Review [README.md](README.md) for overview
4. Check browser console for errors
5. Check terminal logs for server errors

## 🚀 Deployment Checklist

- [ ] Updated all environment variables
- [ ] Changed default credentials
- [ ] Updated JWT_SECRET
- [ ] Configured MongoDB Atlas
- [ ] Set CORS_ORIGIN to production domain
- [ ] Enabled HTTPS
- [ ] Setup monitoring
- [ ] Configured backups
- [ ] Tested all endpoints
- [ ] Verified database connection

---

**Last Updated**: 2024  
**Version**: 1.0.0  
**Status**: Production Ready ✅
