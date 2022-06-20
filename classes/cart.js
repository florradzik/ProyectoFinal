class Cart {
  constructor() {
    //id en el archivo
    this.timestamp = Date.now()
    this.products = []
  }

  getProducts() {
    return this.products
  }

  addProduct(obj) {
    return this.products.push(obj)
  }

  removeProduct(id) {
    const idx = this.products.findIndex((p) => p.id === id)
    if (idx != -1) this.products.splice(idx, 1)
  }
}

module.exports = Cart
