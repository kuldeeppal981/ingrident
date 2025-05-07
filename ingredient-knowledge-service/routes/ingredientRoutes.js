const express = require('express');
const router = express.Router();
const controller = require('../controllers/ingredientController');

router.get('/:name', controller.getIngredient);
router.post('/', controller.createIngredient);
router.get('/', controller.listIngredients);

module.exports = router;
