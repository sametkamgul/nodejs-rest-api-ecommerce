const express = require("express");
const bcrypt = require("bcrypt");
require("dotenv").config();

const authentication = require("../middleware/authentication");
const { logging } = require("../middleware/logger");
const customerService = require("../service/customerService");

const router = express.Router();

router.get("/:username", authentication, logging, async (req, res) => {
  const username = req.params.username;
  const session = req.session || null;

  try {
    const customer = await customerService.getCustomer(username);

    if (!customer) {
      return res.status(404).json({ error: "not found" });
    }

    res.status(200).json({ customer, session });
  } catch (error) {
    res.status(500).json({
      error: error?.message || "internal server error",
      detail: error?.errors,
      session,
    });
  }
});

router.post("/", authentication, logging, async (req, res) => {
  const { username, password, email, firstName, lastName, phone } = req.body;

  try {
    const passwordHash = bcrypt.hashSync(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const existingCustomer = await customerService.getCustomer(username);

    if (!existingCustomer) {
      const customer = await customerService.createCustomer(
        username,
        passwordHash,
        email,
        firstName,
        lastName,
        phone
      );

      delete customer.password;

      return res.status(201).json({ customer: customer });
    }

    res.status(200).json({
      customer: existingCustomer,
      error: true,
      message: "customer is already registered",
    });
  } catch (error) {
    const parsedDetails = error?.errors?.map((e) => e.message);
    res.status(500).json({
      error: error?.message || "internal server error",
      detail: parsedDetails,
    });
  }
});

module.exports = router;
