const ProductModel = require("../model/Product");
const ReviewModel = require("../model/Review");

/**
 * returns all products
 *
 * @return {Array} - Array of Objects(Product model object)
 */
async function getProducts() {
  const products = await ProductModel.findAll();

  return products;
}

/**
 * returns specific product by id
 *
 * @param {Number} id
 * @return {Object} empty or Product model object
 */
async function getProduct(id) {
  const product = await ProductModel.findOne({
    include: ReviewModel,
    where: { id: id },
  });

  return product;
}

async function insertProduct(product) {
  const newProduct = await ProductModel.create(product);

  return newProduct;
}

async function deleteProduct(id) {
  const result = await ProductModel.destroy({
    where: {
      id: id,
    },
  });

  return result;
}

async function updateProduct(product) {
  const id = product.id;

  if (!id) {
    throw new Error("id is required");
  }

  let existingProduct = await ProductModel.findByPk(id);

  if (!existingProduct) {
    throw new Error(`product with id:${id} is not found`);
  }

  await ProductModel.update(product, {
    where: {
      id: id,
    },
  });

  const updatedProduct = await ProductModel.findOne({ where: { id: id } });

  return updatedProduct;
}

module.exports.getProducts = getProducts;
module.exports.getProduct = getProduct;
module.exports.insertProduct = insertProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
