const express = require('express');
const parserRoutes = require('./routes/parserRoutes');
const app = express();

app.use(express.json());
app.use('/api/parser', parserRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`Ingredient Parser Service running on port ${PORT}`);
});
