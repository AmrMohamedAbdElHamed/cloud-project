const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3001;
let user_id 
// Create a PostgreSQL connection
const client = new Client({
    user: 'postgres',
    host: 'postgres-container',
    database: 'projectdb',
    password: '20201700558',
    port: 5432 // Default PostgreSQL port
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Error connecting to database:', err.stack));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('catalog_style'));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'catalogPage'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'catalog_style', 'catalogPage.html'));
});

// Define route to render HTML page with product data
app.get('/Catalog', async (req, res) => {
    user_id = req.query.userId;
    
    try {
        const products = await client.query('SELECT * FROM product WHERE productNum > 0');

        res.render('catalogPage', { products: products.rows, userId: user_id });
    } catch (error) {
        console.error('Error fetching products:', error.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define route to add a product to the cart
app.post('/cart', (req, res) => {
    const { productId } = req.body;
    // Add the product to the cart
    client.query('INSERT INTO cart (userId, productId) VALUES ($1, $2)', [user_id, productId], (error, result) => {
        if (error) {
            console.error('Error executing query:', error.stack);
            res.status(500).json({ error: 'Internal Server Error' });
        }
        else{
            res.status(204).end();
        }
    });
});

app.get('/gotocart', (req, res) => {
    res.redirect(`http://localhost:3002/cart?userId=${user_id}`);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
