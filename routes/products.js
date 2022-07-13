const { Router } = require("express")
const FactoryDAO = require("../dao/index")
const DAO = FactoryDAO()

const router = Router()

router.get("/:id?", (req, res) => {
  const id = req.params.id
  if (id) res.send(await DAO.products.getByID(id))
  else res.send(await DAO.products.getAll())
})

router.post("/", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    DAO.products.save(req.body)
    res.send({mensaje: 'Added product'})
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

router.put("/:id", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    const id = req.params.id
    await DAO.products.editById(req.body , Number(id))
    res.send('Objeto editado correctamente')
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

router.delete("/:id", (req, res) => {
  const admin = req.headers.admin
  if (admin) {
    DAO.products.deleteByID(id)
    res.send({mensaje: 'Product removed'})
  } else {
    res.send("No tiene permisos para esta ruta")
  }
})

module.exports = router
