const ContenedorMongo = require("../../containers/contMongo")
const ProductModel = require("../../models/product.model")

class ProductMongoDAO extends ContenedorMongo {
  constructor() {
    super("mongodb://localhost/productos", ProductModel)
  }
}

module.exports = ProductMongoDAO
