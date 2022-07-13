const contenedorFile = require("../../containers/contFile")

class CartFileDAO extends contenedorFile {
  constructor() {
    super("DB_carts.json")
  }
}

module.exports = CartFileDAO
