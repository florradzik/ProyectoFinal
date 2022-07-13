const mongoose = require("mongoose")

const ProductModel = mongoose.model(
  "Products",
  new mongoose.Schema({
    code: String,
    name: String,
    description: String,
    photo: String,
    price: Number,
    stock: Number,
    createdAt: Date,
  })
)

module.exports = ProductModel
