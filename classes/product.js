class Product {
  constructor(obj) {
    console.log(obj)
    //id dado por el archivo
    this.timestamp = Date.now()
    this.name = obj.name
    this.description = obj.description
    this.code = obj.code
    this.photo = obj.photo
    this.price = obj.price
    this.stock = obj.stock
  }
}

module.export = Product
