const Tesseract = require('tesseract.js');

const extractTextFromImage = async (imagePath) => {
  try {
    const result = await Tesseract.recognize(
      imagePath, 
      'eng', 
      {
        logger: (m) => console.log(m),
      }
    );
    return result.data.text;
  } catch (error) {
    console.error('Error in OCR processing:', error);
    throw error;
  }
};

module.exports = { extractTextFromImage };
