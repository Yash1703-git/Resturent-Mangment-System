const express = require('express');
const router = express.Router();
const { listFoods, getFood } = require('../controllers/foodController');

router.get('/', listFoods);
router.get('/:id', getFood);

module.exports = router;
