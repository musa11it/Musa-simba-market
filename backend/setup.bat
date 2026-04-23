@echo off
echo.
echo 🦁 Welcome to Simba Supermarket Backend Setup!
echo.
echo ============================================================
echo Checking Node.js installation...
echo.

node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Found Node.js: %NODE_VERSION%

echo.
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)
echo ✅ Dependencies installed

echo.
echo 🗄️  Setting up database...
call npm run init
if errorlevel 1 (
    echo ⚠️  Database setup had issues, but you can continue
)

echo.
echo ============================================================
echo ✨ Setup Complete!
echo ============================================================
echo.
echo 📖 Next Steps:
echo 1. Start the server:
echo    npm run dev
echo.
echo 2. Open your browser:
echo    http://localhost:5000/login.html
echo.
echo 3. Login with default credentials:
echo    Email: superadmin@simba.com
echo    Password: Change@123
echo.
echo ⚠️  IMPORTANT: Change the default password immediately!
echo.
echo 📚 For more information, see SETUP_GUIDE.md
echo.

pause
