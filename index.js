const express = require("express")
const connectMongo = require("./config/db.mongo")
const fileUpload = require("express-fileupload")

const routerProduct = require("./router/products.router")
const routerUser = require("./router/user.router")
const routerCart = require("./router/cart.router")
const routerIndex = require("./routes/index.router")

const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./public"))
app.set("view engine", "ejs")
app.set("views", __dirname + "/views")
require("./passport/local-auth")
app.use(
  session({
    secret: "super-secret-password",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000 * 10,
      secure: false,
      httpOnly: true,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())
connectMongo()

app.get("/", routerIndex)
app.use("/api/product", routerProduct)
app.use("/api/user", routerUser)
app.use("/api/cart", routerCart)
app.use("/images/profile-pics", express.static(staticRoute))
app.get("/*", (req, res) => {
  loggWarningFile.warn(`ERROR 404: ${req.method}: ${req.url}`)
  res.status(404).json({
    msg: "Ruta no implementada.",
  })
})

app.listen(8080)

app.on("error", (err) => console.log("Error en el server: " + err))
