const { logger, loggErrorFile, loggWarningFile } = require("../helpers/logger")

//helpers:
const toCamel = require("../helpers/camel-case")
const sendEmail = require("../helpers/send-email-buy")
const sendSms = require("../helpers/send-sms")
const sendWpp = require("../helpers/sendWhatsapp")

//models:
const Users = require("../models/User.model")

const getIndex = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    let { email } = req.session.passport.user
    const user = await Users.findOne({ email })

    user.username = toCamel(user.username)

    return res.render("index", { user })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const getProfile = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    let { email } = req.session.passport.user
    const user = await Users.findOne({ email })

    return res.render("profile", { user })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const getChat = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)

    let { email } = req.session.passport.user
    const user = await Users.findOne({ email })

    return res.render("chatSockets", { user })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const enviarPedido = async (req, res) => {
  let { email } = req.session.passport.user
  const user = await Users.findOne({ email })

  await sendSms(user)
  await sendWpp(user, user.cart)
  sendEmail(user, user.cart)

  user.cart = []

  await user.save()

  res.render("buy-succed", { user })
}

module.exports = {
  getIndex,
  getProfile,
  getChat,
  enviarPedido,
}
