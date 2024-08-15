const express = require('express');
const { updateInventory } = require('../controllers/inventoryController');
const auth = require('../middlewares/auth');
const router = express.Router();

router.put('/:id', auth, updateInventory);

module.exports = router;
