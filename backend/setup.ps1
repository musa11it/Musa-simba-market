# Simba Supermarket Backend Setup Script for PowerShell
# Run: powershell -ExecutionPolicy Bypass -File setup.ps1

Write-Host ""
Write-Host "🦁 Welcome to Simba Supermarket Backend Setup!" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($null -eq $nodeVersion) {
    Write-Host "❌ Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please download and install Node.js from https://nodejs.org/" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Found Node.js: $nodeVersion" -ForegroundColor Green

# Check npm
Write-Host "Checking npm installation..." -ForegroundColor Yellow
$npmVersion = npm --version 2>$null
if ($null -eq $npmVersion) {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✅ Found npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# Check MongoDB
Write-Host "MongoDB Configuration:" -ForegroundColor Yellow
$mongoChoice = Read-Host "Use local MongoDB or MongoDB Atlas? (local/atlas)"

if ($mongoChoice -eq "atlas") {
    $mongoUri = Read-Host "Enter your MongoDB Atlas connection string"
} else {
    $mongoUri = "mongodb://localhost:27017/simba_supermarket"
    Write-Host "Using local MongoDB: $mongoUri" -ForegroundColor Green
}

# Create/Update .env file
Write-Host "Configuring environment..." -ForegroundColor Yellow
if (-Not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env" -Force -ErrorAction SilentlyContinue
    Write-Host "✅ Created .env file from template" -ForegroundColor Green
} else {
    Write-Host "✅ .env file already exists" -ForegroundColor Green
}

# Update MongoDB URI in .env
$envContent = Get-Content ".env" -Raw
$envContent = $envContent -replace "MONGODB_URI=.*", "MONGODB_URI=$mongoUri"
Set-Content ".env" $envContent -NoNewline
Write-Host "✅ Environment configured" -ForegroundColor Green

Write-Host ""

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "✅ Dependencies installed" -ForegroundColor Green

Write-Host ""

# Initialize database
Write-Host "🗄️  Initializing database..." -ForegroundColor Yellow
node init-db.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Database initialization had issues, but you can continue" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📖 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Start the server:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Open your browser:" -ForegroundColor White
Write-Host "   http://localhost:5000/login.html" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Login with default credentials:" -ForegroundColor White
Write-Host "   Email: superadmin@simba.com" -ForegroundColor Gray
Write-Host "   Password: Change@123" -ForegroundColor Gray
Write-Host ""
Write-Host "⚠️  IMPORTANT: Change the default password immediately!" -ForegroundColor Red
Write-Host ""
Write-Host "📚 For more information, see SETUP_GUIDE.md" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
