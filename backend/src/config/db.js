// Import the 'pg' library
const { Pool } = require('pg');

// Create a new connection pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'company_db', // This name is now correct
  password: 'postgres', // <-- CHANGE THIS to your password
  port: 5432,
});

// Export the pool so other files can use it
module.exports = pool;