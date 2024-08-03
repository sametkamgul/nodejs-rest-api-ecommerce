const { DataTypes } = require("sequelize");

const sequelize = require("../helper/connection").sequelize;

const CartItem = require("./CartItem");

const Cart = sequelize.define(
  "Cart",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });


module.exports = Cart;
