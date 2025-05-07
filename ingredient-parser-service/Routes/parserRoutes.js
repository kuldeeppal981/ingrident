const express = require('express');
const router = express.Router();
const { parseIngredients } = require('../Controllers/parserController');

router.post('/parse', parseIngredients);

module.exports = router;
