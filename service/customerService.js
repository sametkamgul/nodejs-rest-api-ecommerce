const Customer = require("../model/Customer");
const Review = require("../model/Review");
const Cart = require("../model/Cart");
const CartItem = require("../model/CartItem");

/**
 * returns customer by username
 *
 * @param {Number} id
 * @return {Object} empty or product model object
 */
async function getCustomer(username) {
  const customer = await Customer.findOne({
    include: [Review, Cart],
    where: { username: username },
  });

  return customer;
}

/**
 * creates a customer
 *
 * @param {String} username
 * @param {String} password
 * @return {Object} created customer
 */
async function createCustomer(
  username,
  passwordHash,
  email,
  firstName,
  lastName,
  phone
) {
  const customer = await Customer.create({
    username,
    passwordHash,
    email,
    firstName,
    lastName,
    phone,
  });

  return customer;
}

module.exports.getCustomer = getCustomer;
module.exports.createCustomer = createCustomer;
