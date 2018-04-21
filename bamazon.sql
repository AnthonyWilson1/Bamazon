DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30),
    price DECIMAL(6,2),
    stock_quantity INTEGER(10),
    Primary Key(item_id)
);

INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Folder', 2.50, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Desk', 99.99, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Ear Buds', 5.64, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Surface Laptop', 650.99, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Ipad Air Cover', 10.99, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Powerbeats 3', 150.99, 100);
INSERT INTO products (product_name, price,stock_quantity)
VALUES ('Surface Laptop Cover', 19.99, 100);
