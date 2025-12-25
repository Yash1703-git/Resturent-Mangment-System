const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const { auth, adminOnly } = require('../middleware/auth');

router.use(auth, adminOnly);

// CREATE DISH
router.post('/', async (req, res) => {
  try {
    const food = await Food.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      category: req.body.category,
      type: req.body.type, // ⭐ NEW
      isFeatured: req.body.isFeatured,
    });

    res.status(201).json(food);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create dish' });
  }
});

// UPDATE DISH
router.put('/:id', async (req, res) => {
  try {
    const updated = await Food.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        category: req.body.category,
        type: req.body.type, // ⭐ NEW
        isFeatured: req.body.isFeatured,
      },
      { new: true, runValidators: true }
    );

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update dish' });
  }
});

module.exports = router;
