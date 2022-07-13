const { Router } = require("express")
const FactoryDAO = require("../daos/index")
const DAO = FactoryDAO()

const router = Router()


router.get("/:id/productos", (req, res) => {
  const id = req.params.id
  const cart = await DAO.cart.getByID(id)
  res.json(cart.products)
})

router.post("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const product = await DAO.product.getByID(id_producto)  // obteniendo datos del producto
  const cart = await DAO.cart.getByID(id) //obteniendo el carrito
  cart.products.push(product) //ingresando el nuevo producto al arreglo del carrito
  const updatedCart = await DAO.cart.editById(cart , id) 
  res.json("Se agrego correctamente el producto al carrito")
})

router.delete("/:id/productos/:id_producto", (req, res) => {
  const id = req.params.id
  const id_producto = req.params.id_producto
  const cart = await DAO.cart.getByID(id) //obteniendo el carrito
  const idx = cart.products.findIndex((obj) => obj.id == id_producto)
  cart.products.splice(idx, 1)
  const updatedCart = await DAO.cart.editById(cart , id) 
  res.json('Se elimino el producto del carrito sin problemas')
})

router.post("/", (req, res) => {
  const cart = {...req.body , ... {products: []}}
  res.json(await DAO.cart.save(cart))
})

router.get('/', (req,res)=> {
  res.send(await DAO.cart.getAll())
})

router.delete('/:id', (req,res) => {
  const id = req.params.id
  await DAO.cart.deleteByID(id)
})

module.exports = router
