const { Router } = require("express")
const Container = require("../filemanagment")

const products = new Container("products.json")
products.init()

const router = Router()

router.get("/:id?", (req, res) => {
  const id = req.params.id
  if (id) res.send(products.getByID(id))
  else res.send(products.getAll())
})

router.post("/", (req, res) => {
  const product = new Product(req.body)
  res.send(products.save(product))
})

router.put("/:id", (req, res) => {
  const id = req.params.id
  const updatedProduct = new Product(req.body)
  const idx = products.find((p) => p.id === id)
  if (idx != -1) {
    products[idx] = updatedProduct
    res.json({ actualizado: products[idx] })
  } else res.json("Id no encontrado")
})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  res.send(products.deleteById(id))
})

class Product {
  constructor(obj) {
    //id dado por el archivo
    timestamp = Date.now()
    this.name = obj.name
    this.description = obj.description
    this.code = obj.code
    this.photo = obj.photo
    this.price = obj.price
    this.stock = obj.stock
  }
}
module.exports = router
module.exports = products
module.exports = Product