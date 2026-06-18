const bcrypt = require('bcryptjs');
const User = require('../models/User');

const demoUsers = [
  {
    name: 'Admin User',
    email: 'admin@shopez.com',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    name: 'ShopEZ Customer',
    email: 'user@shopez.com',
    password: 'User@123',
    role: 'user',
  },
];

const seedDemoUsers = async () => {
  for (const demoUser of demoUsers) {
    const existingUser = await User.findOne({ email: demoUser.email });

    if (existingUser) {
      continue;
    }

    const hashedPassword = await bcrypt.hash(demoUser.password, 10);

    await User.create({
      name: demoUser.name,
      email: demoUser.email,
      password: hashedPassword,
      role: demoUser.role,
    });
  }
};

module.exports = seedDemoUsers;
