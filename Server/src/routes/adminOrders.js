const express = require('express');
const router = express.Router();
const { auth, adminOnly } = require('../middleware/auth');
const { adminList, patchStatus } = require('../controllers/orderController');

router.use(auth, adminOnly);
router.get('/', adminList);
router.patch('/:id/status', patchStatus);

module.exports = router;
