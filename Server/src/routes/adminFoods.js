const express = require('express');
const router = express.Router();
const { createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { auth, adminOnly } = require('../middleware/auth');

router.use(auth, adminOnly);
router.post('/', createFood);
router.put('/:id', updateFood);
router.delete('/:id', deleteFood);

module.exports = router;
