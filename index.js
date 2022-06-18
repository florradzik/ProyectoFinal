const express = require("express")
const app = express()
const productsRouter = require("./routes/products")
const shoppingCartRouter = require("./routes/shoppingcart")

process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/static", express.static("public"))

app.use("/api/products", productsRouter)
app.use("/api/shoppingCart", shoppingCartRouter)

app.get("/", (req, res) => {
  res.send({ message: "Server running ok" })
})

app.listen(PORT, () => {
  console.log("Listening on port: " + PORT)
})

app.on("error", (err) => console.log("Error en el server: " + err))
