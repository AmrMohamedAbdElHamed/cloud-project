const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3002;
let user_id

// PostgreSQL database configuration
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
// functions
function getTotal(products) {
  return products.reduce((total, product) => total + (product.productnum * 10), 0);
}
//--------------------------
// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serving static files
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/checkout_to_cart', (req, res) =>{
  try {
    res.redirect(`/cart?userId=${user_id}`);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/cart', async (req, res) => {
  user_id = req.query.userId;
  try {
      // Query to fetch products from the cart for a specific user
      const query = `
          SELECT product.productID, product.productName, product.productNum, product.productImg
          FROM product
          INNER JOIN cart ON product.productID = cart.productID
          WHERE cart.userID = $1;
      `;
      
      // Execute the query
      const { rows } = await client.query(query, [user_id]);
      // Send the products data to the client
      res.render('index', { products: rows ,getTotal: getTotal});
  } catch (error) {
      console.error('Error fetching products:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Checkout route
app.post('/checkout', async (req, res) => {
  try {
      // Delete rows from the cart table for the specific user ID
      const deleteQuery = `
          DELETE FROM cart
          WHERE userID = $1;
      `;
      await client.query(deleteQuery, [user_id]);

      res.redirect(`/checkout-success?userId=${user_id}`);
  } catch (error) {
      console.error('Error during checkout:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/checkout-success', async (req, res) => {
  user_id = req.query.userId;
  try {
    // Here you can fetch additional details about the user if needed
    res.render('checkout-success', { message: 'Checkout completed successfully', userId: user_id });
  } catch (error) {
    console.error('Error displaying checkout success:', error.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Checkout route
app.get('/catalog', (req, res) => {
  try {
    res.redirect(`http://localhost:3001/Catalog?userId=${user_id}`);
    } catch (error) {
      console.error('Error going to Catalog:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
