const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { createOrder, listMine } = require('../controllers/orderController');

router.post('/', auth, createOrder);
router.get('/mine', auth, listMine);

module.exports = router;
