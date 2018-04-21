var inquirer = require('inquirer');
var mysql = require('mysql');
const cTable = require('console.table');

var questions = [{name: 'questionOne', message: 'Product ID'}, {name: 'questionTwo', message: 'How many items would you like to purchase?'}]

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bamazon_db'
  });

function checker (ID, AMOUNT,callback) {
    connection.connect((error) => {
        if (error) throw error
        connection.query(`SELECT * FROM products WHERE item_id = ${ID}`, (error, response) => {
            if (error) throw error
            var stock = response[0].stock_quantity
            var newAmount = stock - AMOUNT
            if (AMOUNT > stock) {
                console.log('Insufficient quantity!')
            }
            else{
            callback(ID,newAmount)
            }
        })
        }
        );
}

function checkout (ID,NEWAMOUNT) {
        connection.query(`UPDATE products SET stock_quantity = ${NEWAMOUNT} WHERE item_id = ${ID}`, (error, results) => {
          if (error) {
            return connection.rollback(function() {
              throw error;
            });
          } 
          console.log(results.affectedRows + " record(s) updated");
          connection.end()
        })
}

function cost (ID, AMOUNT) {
    connection.query(`SELECT * FROM products WHERE item_id = ${ID}`, (error, response) => {
        if (error) throw error
        var stock = response[0].stock_quantity
        var newAmount = stock - AMOUNT
        if (AMOUNT < stock) {
            connection.query(`SELECT price FROM products WHERE item_id = ${ID}`, (error, response) => {
                if (error) throw error
                var price = response[0].price
                console.log(price * AMOUNT)
            })
        } else {console.log('Insufficient quantity!')
        connection.end()
    }    
    })      
}

inquirer.prompt(questions).then(function(answers) {
    checker(answers.questionOne,answers.questionTwo,checkout)
    cost(answers.questionOne, answers.questionTwo)
})
