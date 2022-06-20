const { Router } = require("express")
const Container = require("../filemanagment")
const fs = require("fs")
const { type } = require("os")
let totalProducts = new Container("products.json")

const shoppingCart = new Container("shoppingcart.json")

const router = Router()

class Cart {
  constructor() {
    //id en el archivo
    this.timestamp = Date.now()
    this.products = []
  }
}

function getProducts(obj) {
  return obj.products
}

function removeProduct(obj, id) {
  const idx = obj.products.findIndex((p) => p.id === id)
  if (idx != -1) obj.products.splice(idx, 1)
}

router.get("/:id/productos", (req, res) => {
  const id = req.params.id
  const cart = shoppingCart.getByID(id)
  res.send(getProducts(cart))
})

router.post("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const product = totalProducts.getByID(id_producto)
  if (product) {
    const cart = shoppingCart.getByID(id)
    cart.products.push(product)
    shoppingCart.update(cart)
    res.sendStatus(200)
  } else res.send("El id del producto no existe")
})

router.delete("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const cart = shoppingCart.getByID(id)
  res.send(removeProduct(cart, id_producto))
})

router.post("/", (req, res) => {
  const cart = new Cart()
  res.send(shoppingCart.save(cart))
})

module.exports = router
