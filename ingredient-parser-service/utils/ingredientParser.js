const aliases = {
    "ascorbic acid": "Vitamin C",
    "e300": "Vitamin C",
    "sodium chloride": "Salt",
    "flavours": "Flavors"
  };
  
  function normalizeIngredient(rawText) {
    return rawText
      .toLowerCase()
      .replace(/[\n:]/g, ' ')
      .split(/[,;\/]+/)
      .map(item => item.trim())
      .filter(Boolean)
      .map(name => {
        name = name.replace(/\sand\s/g, ' '); 
        return aliases[name] || name.charAt(0).toUpperCase() + name.slice(1);
      });
  }
  
  module.exports = { normalizeIngredient };
  