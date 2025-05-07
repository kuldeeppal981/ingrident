const Ingredient = require('../models/Ingredient');


exports.getIngredient = async (req, res) => {
  const name = req.params.name.toLowerCase();
  try {
    const ingredient = await Ingredient.findOne({
      $or: [
        { name: new RegExp(`^${name}$`, 'i') },
        { aliases: { $in: [new RegExp(`^${name}$`, 'i')] } }
      ]
    });
    if (!ingredient) return res.status(404).json({ message: 'Ingredient not found' });
    res.json(ingredient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createIngredient = async (req, res) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.listIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
