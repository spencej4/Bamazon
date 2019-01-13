var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Progress_19",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  readProducts();
//   createProduct();
});

// constructor function for new orders
function Order(product_id, quantity) {
  this.product_id = product_id;
  this.quantity = quantity;
}

// print function for new orders
Order.prototype.printInfo = function() {
  console.log("Product ID: " + this.product_id + "\nQuantity: " + this.quantity);
};

Order.prototype.checkStock = function() {
    check_DB_Stock(this.product_id, this.quantity)
}

function check_DB_Stock(item, qty) {
    let desired_item_id = item;
    let desired_quantity = qty;
    console.log(`Checking stock for Product ID: ${desired_item_id}\n`);

    connection.query("SELECT item_id, stock_quantity, price, product_name FROM products WHERE item_id =?",
        parseInt(desired_item_id)
        ,function(err, res) {
            if (err) throw err;
            // save db stock of item as variable
            let numInStock = res[0].stock_quantity;
            let price = res[0].price;
            let productName = res[0].product_name;
            // if there's not enough of this item in db stock...
            if (desired_quantity > numInStock) {
                console.log("Insufficient quantity!");
            }else {
                // create a purchase 
                create_DB_Purchase(item, qty, productName, numInStock, price);
            }
            connection.end();
    });
}

create_DB_Purchase = function(item, qty, productName, numInStock, price) {
    let newQty = parseInt(numInStock) - parseInt(qty);

    connection.query("UPDATE products SET ? WHERE ?",
        [ {stock_quantity: newQty}, {item_id: parseInt(item)} ],
        function(err, res) {
            createReceipt(qty, productName, price);
        }
    );
  
}

createReceipt = function(qty, productName, price) {
    let totalCost = parseInt(qty) * parseInt(price);
    console.log(`Purchase Successful!`)
    console.log(`You purchased ${qty} ${productName}'s`);
    console.log(`Total Cost: ${totalCost}`);
}

prompt_customer = function() {
    inquirer.prompt([
    {
        name: "product_id",
        message: "What is the Product ID?"
    }, {
        name: "quantity",
        message: "How many would you like to purchase?"
    }
    ]).then(function(answers) {
        // initializes the variable newProgrammer to be a programmer object which will take
        // in all of the user's answers to the questions above
        var newOrder = new Order(answers.product_id, answers.quantity);
        // printInfo method is run to show that the newProgrammer object was successfully created and filled
        newOrder.printInfo();
        newOrder.checkStock();
    });
}


function readProducts() {
  console.log("Selecting all products...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    for (var i=0; i < res.length; i++) {
        let item_id = res[i].item_id;
        let product_name = res[i].product_name;
        let department_name = res[i].department_name;
        let price = res[i].price;
        let stock_quantity = res[i].stock_quantity;

        console.log(`===========`);
        console.log(`Item ID: ${item_id} | ${product_name} | Price: ${price} | ${department_name} | In Stock: ${stock_quantity}`);  
    }
    // prompt customer to make place an order
    prompt_customer();
  });
}