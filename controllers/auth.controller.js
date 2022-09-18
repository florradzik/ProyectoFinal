const { logger, loggErrorFile, loggWarningFile } = require("../helpers/logger")

const getLogin = (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)
    return res.render("login")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const postLogin = (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)
    return res.redirect("/")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const getRegister = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)
    return res.render("register")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const postRegister = async (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)
    return res.redirect("/auth/login")
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

const logout = (req, res) => {
  try {
    //Log4js
    logger.info(`${req.method}: ${req.url}`)
    const username = req.session.username
    req.session.destroy((err) => {
      if (!err) res.render("logout")
      else res.send({ status: "Logout ERROR ", body: err })
    })
  } catch (error) {
    loggErrorFile.error(`${req.method}: ${req.url} + ${error}`)
  }
}

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  logout,
}
