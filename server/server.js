const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL connection to NeonDB
const pool = new Pool({
  connectionString: process.env.NEON_DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test database connection on startup
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully');
  }
});

// Secret for JWT signing (should be in environment variables)
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

// Middleware to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Test route
app.get('/', (req, res) => {
  res.send('NeonDB API Server is running!');
});

// Admin login endpoint
app.post('/api/admin/login', async (req, res) => {
  console.log('Login attempt received');
  console.log('Request body:', req.body);

  const { password } = req.body;

  // In a real application, you would hash and compare against a stored password
  // For this demo, we'll use a simple hardcoded password check
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Default password for development

  console.log('Expected password:', ADMIN_PASSWORD);

  if (!password) {
    console.log('Password not provided');
    return res.status(400).json({ error: 'Password is required' });
  }

  // Compare the provided password with the stored password
  if (password === ADMIN_PASSWORD) {
    console.log('Password match, generating token');
    // Generate JWT token
    const token = jwt.sign(
      { userId: 1, username: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Login successful'
    });
  } else {
    console.log('Invalid password provided');
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  console.log('Contact form submission received:', req.body);
  const { name, phone, message } = req.body;

  // Validate input
  if (!name || !phone || !message) {
    console.log('Validation failed: Missing required fields');
    return res.status(400).json({ error: 'Name, phone, and message are required' });
  }

  try {
    // Insert the contact form data into the database
    const query = `
      INSERT INTO contact_submissions (name, phone, message)
      VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [name, phone, message];
    console.log('Attempting to execute query:', query);
    const result = await pool.query(query, values);
    console.log('Query executed successfully, result:', result.rows[0]);

    res.status(201).json({
      success: true,
      id: result.rows[0].id,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error inserting contact form data:', error);
    console.error('Error details:', error.message, error.code, error.detail);
    res.status(500).json({ error: 'Failed to submit contact form', details: error.message });
  }
});

// Endpoint to retrieve all contact submissions
app.get('/api/contact', authenticateToken, async (req, res) => {
  try {
    console.log('Fetching contact submissions');
    const result = await pool.query(
      'SELECT id, name, phone, message, created_at FROM contact_submissions ORDER BY created_at DESC'
    );
    console.log(`Found ${result.rows.length} submissions`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// Endpoint to delete a contact submission
app.delete('/api/contact/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Deleting submission with id: ${id}`);
    const result = await pool.query(
      'DELETE FROM contact_submissions WHERE id = $1 RETURNING id',
      [id]
    );

    if (result.rowCount === 0) {
      console.log(`Submission with id ${id} not found`);
      return res.status(404).json({ error: 'Submission not found' });
    }

    console.log(`Successfully deleted submission with id: ${id}`);
    res.json({ success: true, message: 'Submission deleted successfully' });
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    res.status(500).json({ error: 'Failed to delete submission' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});