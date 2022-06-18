const { Router } = require("express")
const Container = require("../filemanagment")
const { products } = require("./products")

const shoppingCart = new Container("shoppingcart.json")
shoppingCart.init()

const router = Router()

router.get("/:id/productos", (req, res) => {
  const id = req.params.id
  const cart = shoppingCart.getByID(id)
  res.send(cart.getProducts())
})

router.post("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const product = products.getByID(id_producto)
  const cart = shoppingCart.getByID(id)
  res.send(cart.addProduct(product))
})

router.delete("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const cart = shoppingCart.getByID(id)
  res.send(cart.removeProduct(id_producto))
})

router.post("/", (req, res) => {
  const cart = newCart()
  res.send(shoppingCart.save(cart))
})

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

module.exports = router
module.exports = Cart
