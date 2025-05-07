// models/Ingredient.js
const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  aliases: [String],
  description: String,
  healthBenefits: [String],
  potentialHarms: [String],
  tags: [String], 
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
