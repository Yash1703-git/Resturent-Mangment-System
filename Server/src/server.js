require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// routes
const authRoutes = require('./routes/auth');
const foodRoutes = require('./routes/foods');
const adminFoodRoutes = require('./routes/adminFoods');
const orderRoutes = require('./routes/orders');
const adminOrderRoutes = require('./routes/adminOrders');

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://resturent-mangment-system.vercel.app',
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server / Postman
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS not allowed'));
    },
    credentials: true,
  })
);

/* ---------- ROUTES ---------- */
app.use('/auth', authRoutes);
app.use('/foods', foodRoutes);
app.use('/admin/foods', adminFoodRoutes);
app.use('/orders', orderRoutes);
app.use('/admin/orders', adminOrderRoutes);

/* ---------- ERROR HANDLER ---------- */
app.use(errorHandler);

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 5000;

connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Failed to connect to MongoDB', err.message);
    process.exit(1);
  });
