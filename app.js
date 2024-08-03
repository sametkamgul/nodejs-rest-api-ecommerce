const express = require("express");
const kerevizlog = require("kerevizlog");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = new express(express.json());
const kLogger = new kerevizlog();

const product = require("./routes/product");
const token = require("./routes/token");
const customer = require("./routes/customer");
const cart = require("./routes/cart");

// all other no-usage endpoints
const error = require("./routes/error");

const connection = require("./helper/connection");

app.use(express.json()); // parsing json in put/post requests

const PORT = process.env.PORT || 3000;

// db connection initialization
connection.init();

// product rest api endpoint
app.use("/api/v1/product/", product);
app.use("/api/v1/token/", token);
app.use("/api/v1/customer/", customer);
app.use("/api/v1/cart", cart);

// swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerDocument));

// all other no-usage endpoints
app.use("/api/v1/*", error);

app.listen(PORT, () => {
  kLogger.info(`listening on PORT:${PORT}`);
});
