const bcrypt = require("bcrypt");
require("dotenv").config();

const saltRounds = parseInt(process.env.SALT_ROUNDS);

// db helper function
const connection = require("../helper/connection");

// db models
const Product = require("../model/Product");
const Customer = require("../model/Customer");
const Cart = require("../model/Cart");
const CartItem = require("../model/CartItem");
const Order = require("../model/Order");
const OrderItem = require("../model/OrderItem");
const Review = require("../model/Review");

// db connection
connection.init();

// create products table
async function createProductsTable() {
  await Product.sync();
  await Customer.sync();
  await Cart.sync();
  await CartItem.sync();
  await Order.sync();
  await OrderItem.sync();
  await Review.sync();

  console.log("db tables are synced!");
}

// insert data to products table
async function insertDataToProductTable() {
  Promise.all([
    Product.bulkCreate([
      {
        id: "1",
        name: "Apple Macbook Air M2",
        description:
          "M2 powered Macbook Air computer for designers, developers and video editors",
        stock: 1200,
        price: 2999.99,
        imageUrl: "",
      },
      {
        id: "2",
        name: "Apple iPhone 14 Pro",
        description:
          "The latest iPhone with A16 Bionic chip, advanced camera system, and ProMotion display",
        stock: 5000,
        price: 1099.99,
        imageUrl: "",
      },
      {
        id: "3",
        name: "Apple iPad Pro 12.9",
        description:
          "iPad Pro with M2 chip, Liquid Retina XDR display, and advanced camera system",
        stock: 3000,
        price: 1299.99,
        imageUrl: "",
      },
      {
        id: "4",
        name: "Apple Watch Series 8",
        description:
          "Advanced health tracking, always-on display, and longer battery life",
        stock: 4000,
        price: 499.99,
        imageUrl: "",
      },
      {
        id: "5",
        name: "Apple AirPods Pro 2nd Gen",
        description:
          "Next-generation AirPods with improved sound quality and noise cancellation",
        stock: 6000,
        price: 249.99,
        imageUrl: "",
      },
      {
        id: "6",
        name: "Apple Mac Mini M2",
        description:
          "Compact desktop computer with M2 chip, perfect for home and office use",
        stock: 2000,
        price: 799.99,
        imageUrl: "",
      },
      {
        id: "7",
        name: "Apple TV 4K",
        description:
          "Stream your favorite content in 4K HDR with the new Apple TV",
        stock: 1500,
        price: 179.99,
        imageUrl: "",
      },
      {
        id: "8",
        name: "Apple HomePod Mini",
        description:
          "Smart speaker with exceptional sound quality and Siri integration",
        stock: 3500,
        price: 99.99,
        imageUrl: "",
      },
      {
        id: "9",
        name: "Apple Magic Keyboard",
        description:
          "Enhanced typing experience with backlit keys and trackpad",
        stock: 2500,
        price: 349.99,
        imageUrl: "",
      },
      {
        id: "10",
        name: "Apple Pro Display XDR",
        description:
          "Professional-grade 32-inch display with 6K resolution and extreme dynamic range",
        stock: 800,
        price: 4999.99,
        imageUrl: "",
      },
    ]),

    Customer.findOne({ where: { username: process.env.TEST_USER_EMAIL } }).then(
      (u) => {
        if (!u) {
          Customer.create({
            username: process.env.TEST_USER_USERNAME,
            email: process.env.TEST_USER_EMAIL,
            firstName: process.env.TEST_USER_FIRSTNAME,
            lastName: process.env.TEST_USER_LASTNAME,
            passwordHash: bcrypt.hashSync(
              process.env.TEST_USER_PASSWORD,
              saltRounds
            ),
            phone: process.env.TEST_USER_PHONE,
          });
        }
      }
    ),
  ]).then(() => {
    console.log("data is inserted to database!");
  });
}

// init tables and datas
createProductsTable().then(() => {
  insertDataToProductTable();
});
