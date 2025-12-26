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
      // allow Postman / server-to-server
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // ❗ DO NOT throw error — just deny silently
      return callback(null, false);
    },
    credentials: true,
  })
);

/* ---------- ROUTES ---------- */
app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/admin/foods', adminFoodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin/orders', adminOrderRoutes);

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
  .catch(err => {
    console.error('❌ MongoDB error:', err.message);
    process.exit(1);
  });
