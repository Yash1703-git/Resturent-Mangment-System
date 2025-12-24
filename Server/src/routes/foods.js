const express = require('express');
const router = express.Router();
const Food = require('../models/Food'); // ✅ REQUIRED
const { listFoods, getFood } = require('../controllers/foodController');

/**
 * GET /api/foods
 * Query params:
 * - q (search)
 * - featured=true
 */
router.get('/', async (req, res) => {
  try {
    const { featured, q } = req.query;

    const filter = {};

    if (featured === 'true') {
      filter.isFeatured = true;
    }

    if (q) {
      filter.title = { $regex: q, $options: 'i' };
    }

    const foods = await Food.find(filter).sort({ createdAt: -1 });

    res.json({ items: foods });
  } catch (err) {
    console.error('LIST FOODS ERROR:', err);
    res.status(500).json({ message: 'Failed to fetch foods' });
  }
});

/**
 * GET /api/foods/:id
 */
router.get('/:id', getFood);

module.exports = router;
