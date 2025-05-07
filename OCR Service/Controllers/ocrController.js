const { extractTextFromImage } = require('../Services/ocrService');

const handleOCR = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const imagePath = req.file.path; 
    const text = await extractTextFromImage(imagePath);
    return res.status(200).json({ extractedText: text });
  } catch (error) {
    return res.status(500).json({ message: 'Error processing the image' });
  }
};

module.exports = { handleOCR };
