const pool = require('../config/db'); // Imports your database connection
const bcrypt = require('bcrypt'); // Imports the password hasher
const jwt = require('jsonwebtoken'); // Imports the JSON Web Token tool

// This is the main registration function
exports.register = async (req, res) => {
  try {
    // 1. Get user data from the request body
    const { email, password, full_name, gender, mobile_no } = req.body;

    // 2. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Save the new user to the database
    const newUser = await pool.query(
      'INSERT INTO users (email, password, full_name, gender, mobile_no, signup_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, email',
      [email, hashedPassword, full_name, gender, mobile_no, 'e'] // 'e' is for email signup, as per the doc
    );

    // 4. Send a success response
    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify mobile OTP.',
      data: { user_id: newUser.rows[0].id },
    });
  } catch (err) {
    // 5. Send an error response if anything fails
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// --- This is the new login function ---
exports.login = async (req, res) => {
  try {
    // 1. Get email and password from request
    const { email, password } = req.body;

    // 2. Find the user in the database
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      // If user not found
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 3. Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      // If password doesn't match
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Create and send a JWT token
    const token = jwt.sign(
      { id: user.rows[0].id, email: user.rows[0].email },
      'your_jwt_secret_key_123!', // This should be a secret, but is fine for testing
      { expiresIn: '90d' } // Expires in 90 days, as per the doc
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token: token,
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};