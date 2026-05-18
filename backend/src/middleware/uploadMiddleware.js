const multer = require('multer');

// This tells multer to store the file in memory as a buffer
const storage = multer.memoryStorage();

// Initialize multer with the storage settings
const upload = multer({ storage: storage });

module.exports = upload;