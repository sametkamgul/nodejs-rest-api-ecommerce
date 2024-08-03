const { DataTypes } = require("sequelize");

const sequelize = require("../helper/connection").sequelize;

const Order = require("./Order");
const Cart = require("./Cart");
const Review = require("./Review");

const Customer = sequelize.define(
  "Customers",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notContains: [" "],
        len: [5, 16],
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
  }
);

Customer.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(Customer, { foreignKey: "userId" });

Customer.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(Customer, { foreignKey: "userId" });

module.exports = Customer;
