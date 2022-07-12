const { Router } = require("express")
const Container = require("../filemanagment")

const products = new Container("products.json")

const router = Router()

router.get("/:id?", (req, res) => {
  const id = req.params.id
  if (id) res.send(products.getByID(id))
  else res.send(products.getAll())
})

router.post("/", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    console.log(req.body)
    const product = new Product(req.body)
    res.send(products.save(product))
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

router.put("/:id", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    const id = req.params.id
    const updatedProduct = new Product(req.body)
    const idx = products.find((p) => p.id === id)
    if (idx != -1) {
      products[idx] = updatedProduct
      res.json({ actualizado: products[idx] })
    } else res.send("Id no encontrado")
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

router.delete("/:id", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    const id = req.params.id
    res.send(products.deleteById(id))
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

module.exports = router
