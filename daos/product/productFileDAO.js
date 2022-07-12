const contenedorFile = require("../../containers/contFile")

class ProductFileDAO extends contenedorFile {
  constructor() {
    super("DB_products.json")
  }
}

module.exports = ProductFileDAO
