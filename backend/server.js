const express = require('express');
const cors = require('cors'); // <-- 1. Import cors
const app = express();

// --- SETUP MIDDLEWARE ---
app.use(cors()); // <-- 2. Use cors
app.use(express.json());

const port = 5000;

// --- IMPORT AND USE YOUR ROUTES ---
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const companyRoutes = require('./src/routes/companyRoutes');
app.use('/api/company', companyRoutes);

// A test route to see if it works
app.get('/', (req, res) => {
  res.send('Hello! My server is working!');
});

// Start listening
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});