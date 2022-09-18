const { logger, loggErrorFile, loggWarningFile } = require("../helpers/logger")

//Models:
const Products = require("../models/Product.model")
const Users = require("../models/User.model")

const getAllProducts = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    req.session.touch()
    let { email } = req.session.passport.user
    const user = await Users.findOne({ email })

    const { type, sort } = req.query

    const products = await Products.find()
    const count = await Products.count()

    return res.render("productos", { products, user, type, count })
    // return res.json({ count, products })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const getProductById = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    req.session.touch()
    const { id } = req.params

    const product = await Products.findById(id)

    if (!product || !product.state) {
      return res.status(400).json({
        error: `Producto con ID: ${id} no encotrado.`,
      })
    }

    return res.json({ product })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const newProduct = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    req.session.touch()

    const { title, price, desc, img, type } = req.body
    const newProd = new Products({ title, price, desc, img, type })

    newProd.state = true

    await newProd.save()

    return res.redirect("/products")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const updateProduct = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    req.session.touch()
    const { id } = req.params
    const { title, price, desc, img, type } = req.body

    const editedProd = await Products.findById(id)

    if (!editedProd) {
      return res.status(400).json({
        error: `El producto con ID: ${id} no existe.`,
      })
    }

    if (title) editedProd.title = title
    if (price) editedProd.price = price
    if (desc) editedProd.desc = desc
    if (img) editedProd.img = img
    if (type) editedProd.type = type

    await editedProd.save()

    // return res.json({
    //   msg: "Producto actualizado.",
    //   editedProd
    // });
    return res.redirect("/products")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const deleteProduct = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    req.session.touch()
    const { id } = req.params

    const deletedProd = await Products.findById(id)

    if (!deletedProd) {
      return res.status(400).json({
        error: `El producto con ID: ${id} no existe.`,
      })
    }

    deletedProd.state = false

    await deletedProd.save()

    // return res.json({
    //   mesage: `Producto con ID: ${id} eliminado.`
    // })
    return res.redirect("/products")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  newProduct,
  updateProduct,
  deleteProduct,
}
