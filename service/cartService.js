const Cart = require("../model/Cart");
const CartItem = require("../model/CartItem");
const Product = require("../model/Product");

async function getCartByCustomerId(customerId) {
  const cart = await Cart.findOne({
    include: [CartItem],
    where: {
      userId: customerId,
    },
  });

  return cart;
}

async function createCustomerCart(customerId) {
  const cart = await Cart.create({ userId: customerId });

  return cart;
}

async function addProducts(cartId, customerId, products) {
  const productIds = products?.map((p) => p.id);

  // TODO: quantity fix
  const productsItems = await Product.findAll({
    where: {
      id: productIds,
    },
  });

  productsItems?.forEach(async (p) => {
    await CartItem.create({
      cartId: cartId,
      productId: p.id,
      quantity: 1,
      price: p.price,
    });
  });

  await CartItem.sync();
  const updatedCart = await Cart.findOne({
    include: [CartItem],
    where: {
      userId: customerId,
    },
  });

  return updatedCart;
}

async function deleteProducts(cartId, customerId, productIds) {
  const productsItems = await Product.findAll({
    where: {
      id: productIds,
    },
  });

  productsItems?.forEach(async (p) => {
    const re = await CartItem.destroy({
      where: {
        cartId: cartId,
        productId: p.id,
      },
    });
  });

  await CartItem.sync();
  const updatedCart = await Cart.findOne({
    include: [CartItem],
    where: {
      userId: customerId,
    },
  });

  return updatedCart;
}

module.exports = {
  getCartByCustomerId,
  createCustomerCart,
  addProducts,
  deleteProducts,
};
