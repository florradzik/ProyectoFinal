const router = require("express").Router()

//middlewares:
const validateUser = require("../middlewares/validate-user")

//controllers
const {
  getIndex,
  getProfile,
  getChat,
  enviarPedido,
} = require("../controllers/index.controller")

router.get("/", validateUser, getIndex)

router.get("/profile", validateUser, getProfile)

router.get("/chat", validateUser, getChat)

router.get("/enviar-pedido", validateUser, enviarPedido)

module.exports = router
