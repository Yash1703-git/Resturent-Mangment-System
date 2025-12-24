const express = require('express');
const router = express.Router();
const Food = require('../models/Food'); // ⭐ FIX
const { createFood, deleteFood } = require('../controllers/foodController');
const { auth, adminOnly } = require('../middleware/auth');

router.use(auth, adminOnly);

// CREATE
router.post('/', createFood);

// DELETE
router.delete('/:id', deleteFood);

// UPDATE (FEATURED FIX)
router.put('/:id', async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      category,
      isFeatured,
    } = req.body;

    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        price,
        imageUrl,
        category,
        isFeatured,
      },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Dish not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('UPDATE FOOD ERROR:', err);
    res.status(500).json({ message: 'Failed to update dish' });
  }
});

module.exports = router;
