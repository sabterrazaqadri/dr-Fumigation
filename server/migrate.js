const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function runMigration() {
  try {
    console.log('Connecting to database...');
    
    // Create the contact_submissions table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    console.log('Creating table if it does not exist...');
    await pool.query(createTableQuery);
    
    console.log('Table created successfully!');
    
    // Test inserting a record
    console.log('Testing insertion...');
    const insertQuery = `
      INSERT INTO contact_submissions (name, phone, message) 
      VALUES ($1, $2, $3) 
      RETURNING id;
    `;
    
    const result = await pool.query(insertQuery, ['Test User', '1234567890', 'Test message']);
    console.log('Test record inserted with ID:', result.rows[0].id);
    
    // Clean up the test record
    await pool.query('DELETE FROM contact_submissions WHERE id = $1;', [result.rows[0].id]);
    console.log('Test record cleaned up.');
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await pool.end();
    console.log('Database connection closed.');
  }
}

runMigration();