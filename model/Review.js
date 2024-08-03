const { DataTypes } = require("sequelize");

const sequelize = require("../helper/connection").sequelize;

const Customer = require("./Customer");
const Product = require("./Product");

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: true,
  }
);

Customer.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(Customer, { foreignKey: "userId" });

module.exports = Review;
