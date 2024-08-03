const express = require("express");

const router = express.Router();

const productService = require("../service/productService");
const { logging } = require("../middleware/logger");
const authentication = require("../middleware/authentication");

router.get("/", authentication, logging, async (req, res) => {
  const session = req.session || null;

  try {
    const products = await productService.getProducts();

    res.status(200).json({ products, session });
  } catch (error) {
    res.status(500).json({ error: error?.message || "internal server error" });
  }
});

router.get("/:id", authentication, logging, async (req, res) => {
  const id = req.params.id;
  const session = req.session || null;

  try {
    const product = await productService.getProduct(id);

    if (!product) {
      return res.status(404).json({ error: "not found" });
    }

    res.status(200).json({ product, session });
  } catch (error) {
    res
      .status(500)
      .json({
        error: error?.message || "internal server error",
        detail: error?.errors,
        session,
      });
  }
});

module.exports = router;
