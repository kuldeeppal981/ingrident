const app = require('./app');

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Ingredient Knowledge Base Service running on port ${PORT}`);
});
