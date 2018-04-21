var mysql = require('mysql');
const cTable = require('console.table');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_db'
  });

var prompt = [{type: 'list', name: 'options', message: 'What do you want to do?', choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory','Add New Product']}]

function viewProductsforSale() {
    connection.query(`SELECT * FROM products`, (error, response) => {
        if (error) throw error
        console.table(response)
        connection.end()
})
}

function viewLowInventory() {
    connection.query(`SELECT stock_quantity FROM products`, (error, response) => {
        if (error) throw error
        for (let i = 0; i < response.length; i++) {
            if (response[i].stock_quantity < 5) {
                console.log('Need to restock')
            }
        }
        connection.end()
})
}

function addToInventory(ID, Amount){
    connection.query(`UPDATE products SET stock_quantity = ${AMOUNT} WHERE item_id = ${ID}`, (error, results) => {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        } 
        console.log(results.affectedRows + " record(s) updated");
        connection.end()
})
}

function addNewProduct(Product, Price, Amount) {
    connection.query(`INSERT INTO products (product_name, price, stock_quantity) VALUES ("${Product}","${Price}","${Amount}")`, (error, results) => {
        if (error) {
          return connection.rollback(function() {
            throw error;
          });
        } 
        console.log(results.affectedRows + " record(s) updated");
        connection.end()
})
}

connection.connect((error) => {
    if (error) throw error
    inquier.prompt
    connection.end()
}) 

