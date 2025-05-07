const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ingredientRoutes = require('./routes/ingredientRoutes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/ingredient', ingredientRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

module.exports = app;
