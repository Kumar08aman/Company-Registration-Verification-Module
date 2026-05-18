const jwt = require('jsonwebtoken');

// This function will be our middleware
module.exports = (req, res, next) => {
  try {
    // 1. Get the token from the request header
    // It's usually sent as "Bearer <token>"
    const token = req.headers.authorization.split(' ')[1];

    // 2. Verify the token
    const decodedToken = jwt.verify(token, 'your_jwt_secret_key_123!');

    // 3. Attach the user's data to the request object
    req.user = { 
      id: decodedToken.id, 
      email: decodedToken.email 
    };

    // 4. Call "next()" to allow the request to continue
    next();
  } catch (error) {
    // If token is invalid or not provided
    res.status(401).json({ success: false, message: 'Authentication failed!' });
  }
};