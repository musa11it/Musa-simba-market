const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Branch = require('./src/models/Branch');

const initializeDatabase = async () => {
  try {
    console.log('🚀 Initializing database...');

    // Connect to MongoDB
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/simba_supermarket',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );
    console.log('✅ Connected to MongoDB');

    // Check if super admin exists
    let superAdmin = await User.findOne({ role: 'super_admin' });

    if (!superAdmin) {
      console.log('📝 Creating super admin account...');
      
      superAdmin = new User({
        name: 'Super Administrator',
        email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@simba.com',
        password: process.env.SUPER_ADMIN_PASSWORD || 'Change@123',
        role: 'super_admin',
        isActive: true
      });

      await superAdmin.save();
      console.log('✅ Super admin created successfully');
      console.log(`   Email: ${superAdmin.email}`);
      console.log(`   Password: ${process.env.SUPER_ADMIN_PASSWORD || 'Change@123'}`);
      console.log('   ⚠️  Please change the password immediately!');
    } else {
      console.log('ℹ️  Super admin already exists');
    }

    // Create sample branch if needed
    const branchCount = await Branch.countDocuments();
    if (branchCount === 0) {
      console.log('📝 Creating sample branch...');
      
      const sampleBranch = new Branch({
        name: 'Main Store',
        location: 'Downtown',
        address: {
          street: '123 Main Street',
          city: 'City',
          state: 'State',
          postalCode: '12345',
          country: 'Country'
        },
        phone: '123-456-7890',
        email: 'mainstore@simba.com',
        status: 'active'
      });

      await sampleBranch.save();
      console.log('✅ Sample branch created');
    }

    console.log('\n✨ Database initialization complete!');
    console.log('\n📖 Next steps:');
    console.log('1. Start the server: npm run dev');
    console.log('2. Access login page: http://localhost:5000/login.html');
    console.log('3. Login with super admin credentials');
    console.log('4. Create branch admins and manage your branches');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    process.exit(1);
  }
};

initializeDatabase();
