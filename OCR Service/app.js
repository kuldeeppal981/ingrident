const express = require('express');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');


const ocrRoutes = require('./routes/ocrRoutes');

dotenv.config();

const app = express();



app.use(express.json());


app.use('/api/ocr', ocrRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
