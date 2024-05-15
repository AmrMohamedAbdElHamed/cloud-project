const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = process.env.PORT || 3002;

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

// Serving static files (assuming they're in a directory named 'public')
app.use(express.static('public'));

app.set('view engine', 'ejs');


// // Example route to add a product to the cart
// app.post('/cart', (req, res) => {
//   const { userId, productId } = req.body;

//   client.query('INSERT INTO cart (userId, productId) VALUES ($1, $2)', [1, 1])
//       .then(() => res.json({ message: 'Product added to cart successfully' }))
//       .catch(error => {
//           console.error('Error executing query:', error.stack);
//           res.status(500).json({ error: 'Internal Server Error' });
//       });
// });
app.get('/:C', async (req, res) => {
  // const userId = req.params.C; // Assuming user ID is passed as a parameter in the URL
  const userId = 1;
  try {
      // Query to fetch products from the cart for a specific user
      const query = `
          SELECT product.productID, product.productName, product.productNum, product.productImg
          FROM product
          INNER JOIN cart ON product.productID = cart.productID
          WHERE cart.userID = $1;
      `;
      
      // Execute the query
      const { rows } = await client.query(query, [userId]);
      console.log(rows);
      // Send the products data to the client
      res.render('index', { products: rows ,getTotal: getTotal});
  } catch (error) {
      console.error('Error fetching products:', error.stack);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
