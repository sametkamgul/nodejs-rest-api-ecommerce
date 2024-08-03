const express = require("express");
const authentication = require("../middleware/authentication");
const { logging } = require("../middleware/logger");
const cartService = require("../service/cartService");
const customerService = require("../service/customerService");

const router = express.Router();

router.get("/", authentication, logging, async (req, res) => {
  const username = req.query.username;
  const session = req.session || null;

  try {
    const customer = await customerService.getCustomer(username);
    const existingcart = await cartService.getCartByCustomerId(customer.id);

    // FIXME: if customer has no cart, we create new one, it can be moved to register step
    if (!existingcart) {
      const newCart = await cartService.createCustomerCart(customer.id);

      return res.status(201).json({ cart: newCart, session });
    }

    res.status(200).json({ cart: existingcart, session });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "internal server error",
      detail: error?.errors,
      session,
    });
  }
});

router.post("/", authentication, logging, async (req, res) => {
  const { username, products } = req.body;
  const session = req.session || null;

  try {
    const customer = await customerService.getCustomer(username);
    const cart = await cartService.getCartByCustomerId(customer?.id);
    const updatedCart = await cartService.addProducts(
      cart?.id,
      customer?.id,
      products
    );

    res.status(201).json({ cart: updatedCart, session });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "internal server error",
      detail: error,
      session,
    });
  }
});

router.delete("/", authentication, logging, async (req, res) => {
    const { username, productIds } = req.body;
    const session = req.session || null;
  
    try {
      const customer = await customerService.getCustomer(username);
      const cart = await cartService.getCartByCustomerId(customer?.id);
      const updatedCart = await cartService.deleteProducts(
        cart?.id,
        customer?.id,
        productIds
      );
  
      res.status(200).json({ cart: updatedCart, session });
    } catch (error) {
      res.status(500).json({
        error: error?.message || "internal server error",
        detail: error,
        session,
      });
    }
  });

module.exports = router;
