const { normalizeIngredient } = require('../utils/ingredientParser');

const parseIngredients = (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: "No OCR text provided" });

  const ingredients = normalizeIngredient(text);
  res.json({ ingredients });
};

module.exports = { parseIngredients };
