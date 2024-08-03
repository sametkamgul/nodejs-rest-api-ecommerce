// models/associations.js
const Customer = require("./Customer");
const Product = require("./Product");
const Order = require("./Order");
const OrderItem = require("./OrderItem");
const Cart = require("./Cart");
const CartItem = require("./CartItem");
const Review = require("./Review");

// Define associations
Customer.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(Customer, { foreignKey: "userId" });

Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

Customer.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(Customer, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

Product.hasMany(CartItem, { foreignKey: "productId" });
CartItem.belongsTo(Product, { foreignKey: "productId" });

Product.hasMany(Review, { foreignKey: "productId" });
Review.belongsTo(Product, { foreignKey: "productId" });

Customer.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(Customer, { foreignKey: "userId" });

module.exports = {
  Customer,
  Product,
  Order,
  OrderItem,
  Cart,
  CartItem,
  Review,
};
