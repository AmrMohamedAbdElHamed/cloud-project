-- Create the database if it doesn't exist
CREATE DATABASE projectdb; 

-- Connect to the database
\c projectdb;

-- Create the 'user_' table
CREATE TABLE IF NOT EXISTS user_ (
    userID SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    userEmail VARCHAR(100) NOT NULL,
    userPassword VARCHAR(50) NOT NULL,
    userAddress VARCHAR(255) NOT NULL,
    userPhone VARCHAR(20) NOT NULL
);

-- Create the 'product' table
CREATE TABLE IF NOT EXISTS product (
    productID SERIAL PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    productNum INT NOT NULL,
    productImg VARCHAR(255) NOT NULL
);

-- Create the 'cart' table
CREATE TABLE IF NOT EXISTS cart (
    cartID SERIAL PRIMARY KEY,
    userID INT NOT NULL,
    productID INT NOT NULL,
    FOREIGN KEY (userID) REFERENCES user_(userID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);

-- Create the 'user_product' table
CREATE TABLE IF NOT EXISTS user_product (
    userID INT,
    productID INT,
    FOREIGN KEY (userID) REFERENCES user_(userID),
    FOREIGN KEY (productID) REFERENCES product(productID)
);
