const ContenedorMongo = require("../../containers/contMongo")
const CartModel = require("../../models/cart.model")

class CartMongoDAO extends ContenedorMongo {
  constructor() {
    super("mongodb://localhost/productos", CartModel)
  }
}

module.exports = CartMongoDAO
