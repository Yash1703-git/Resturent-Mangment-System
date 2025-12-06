// (seed some food items and an admin)
require('dotenv').config();
const connectDB = require('./config/db');
const Food = require('./models/Food');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const run = async () => {
  await connectDB(process.env.MONGODB_URI);
  await Food.deleteMany({});
  await User.deleteMany({});
  const items = [
    { title: 'Margherita Pizza', description: 'Classic cheese', price: 199, imageUrl: '', category: 'Pizza' },
    { title: 'Paneer Butter Masala', description: 'Creamy paneer', price: 149, imageUrl: '', category: 'Main' },
    { title: 'Veg Biryani', description: 'Fragrant rice', price: 129, imageUrl: '', category: 'Rice' }
  ];
  await Food.insertMany(items);
  const adminPass = await bcrypt.hash('admin123', 10);
  await User.create({ name: 'Admin', email: 'admin@example.com', passwordHash: adminPass, role: 'admin' });
  console.log('Seed done');
  process.exit();
};
run().catch(e => { console.error(e); process.exit(1); });
