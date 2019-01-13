DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(10) NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(12, 2) NOT NULL,
  stock_quantity INTEGER(10)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (01, "soap", "Beauty and Wellness", 3.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (02, "toothpaste", "Beauty and Wellness", 4.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (03, "floss", "Beauty and Wellness", 2.75, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (04, "facial lotion", "Beauty and Wellness", 5.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (05, "q-tips", "Beauty and Wellness", 1.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (06, "hand lotion", "Beauty and Wellness", 13.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (07, "deoderant", "Beauty and Wellness", 5.50, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (08, "shampoo", "Beauty and Wellness", 10.00, 100);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (09, "body wash", "Beauty and Wellness", 15.00, 75);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES (10, "towels", "Kitchen and Bath", 18.50, 50);