#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('\n🦁 Welcome to Simba Supermarket Backend Setup!');
  console.log('=' .repeat(50));

  try {
    // Check Node.js version
    const nodeVersion = process.version;
    console.log(`\n✅ Node.js version: ${nodeVersion}`);

    // Check if .env exists
    const envPath = path.join(__dirname, '.env');
    let envExists = fs.existsSync(envPath);

    if (!envExists) {
      console.log('\n📝 Setting up environment file...');
      
      // Copy .env.example to .env
      const exampleEnvPath = path.join(__dirname, '.env.example');
      if (fs.existsSync(exampleEnvPath)) {
        fs.copyFileSync(exampleEnvPath, envPath);
        console.log('✅ Created .env file from template');
      } else {
        console.log('⚠️  .env.example not found');
      }
    } else {
      console.log('✅ .env file already exists');
    }

    // Ask for MongoDB URI
    console.log('\n📊 MongoDB Configuration:');
    const mongoOption = await question('Use local MongoDB or MongoDB Atlas? (local/atlas): ');
    
    let mongoUri = '';
    if (mongoOption.toLowerCase() === 'atlas') {
      mongoUri = await question('Enter your MongoDB Atlas connection string: ');
    } else {
      mongoUri = 'mongodb://localhost:27017/simba_supermarket';
      console.log(`Using local MongoDB: ${mongoUri}`);
    }

    // Update .env with MongoDB URI
    let envContent = fs.readFileSync(envPath, 'utf8');
    envContent = envContent.replace(
      /MONGODB_URI=.*/,
      `MONGODB_URI=${mongoUri}`
    );
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment configured');

    // Install dependencies
    console.log('\n📦 Installing dependencies...');
    console.log('This may take a few minutes...');
    try {
      await execAsync('npm install', { cwd: __dirname, stdio: 'inherit' });
      console.log('✅ Dependencies installed');
    } catch (error) {
      console.error('❌ Failed to install dependencies');
      throw error;
    }

    // Initialize database
    console.log('\n🗄️  Initializing database...');
    try {
      await execAsync('node init-db.js', { cwd: __dirname, stdio: 'inherit' });
      console.log('✅ Database initialized');
    } catch (error) {
      console.warn('⚠️  Database initialization had issues, but you can continue');
    }

    // Final instructions
    console.log('\n' + '='.repeat(50));
    console.log('✨ Setup Complete!');
    console.log('='.repeat(50));
    console.log('\n📖 Next Steps:');
    console.log('1. Start the server:');
    console.log('   npm run dev');
    console.log('\n2. Open your browser:');
    console.log('   http://localhost:5000/login.html');
    console.log('\n3. Login with default credentials:');
    console.log('   Email: superadmin@simba.com');
    console.log('   Password: Change@123');
    console.log('\n4. Create your first branch and admin accounts');
    console.log('\n⚠️  IMPORTANT: Change the default password immediately!');
    console.log('\n📚 For more information, see SETUP_GUIDE.md\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
