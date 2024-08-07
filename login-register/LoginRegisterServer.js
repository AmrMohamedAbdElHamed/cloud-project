const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const path = require('path');


const app = express();
const port = 3000;


// PostgreSQL Connection
const client = new Client({
  user: 'postgres',
  host: 'postgres-container',
  database: 'projectdb',
  password: '20201700558',
  port: 5432, // Default PostgreSQL port
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static files
app.use(express.static('login_register_pages'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login_register_pages', 'registerPage.html'));
});

// Route to handle user registration
app.post('/register', (req, res) => {
  const { username, userEmail, userPassword, userAddress, userPhone } = req.body;
  const insertQuery = 'INSERT INTO user_ (username, userEmail, userPassword, userAddress, userPhone) VALUES ($1, $2, $3, $4, $5)';
  client.query(insertQuery, [username, userEmail, userPassword, userAddress, userPhone], (err, result) => {
    if (err) {
      console.error('Error registering user:', err.stack);
      res.status(500).json({ error: 'Error registering user' });
      return;
    }
    console.log('User registered successfully');
    res.redirect('/login/loginPage.html');
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM user_ WHERE username = $1 AND userPassword = $2';
  
  client.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error authenticating user:', err);
      res.status(500).json({ error: 'Error authenticating user' });
      return;
    }

    if (results.rows.length === 0) {
      res.json({ success: false });
      // res.status(401).json({ error: 'Invalid username or password' });
    } else {
      // Redirect to the catalog page upon successful authentication
      res.json({ success: true ,id: results.rows[0].userid});
    }
  });
});

// Error handling middleware for 404 errors (resource not found)
app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you're looking for doesn't exist.");
});

// Error handling middleware for other errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong on the server!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
