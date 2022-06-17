const fs = require("fs")

class Contenedor {
  constructor(filename) {
    console.log("Init Contenedor")
    this.filename = filename
    this.data = []

    try {
      this.read()
    } catch (e) {
      console.log("No se encontro elarchivo")
      console.log("Creando uno nuevo")
      console.log(e)
      this.write()
    }
  }

  write() {
    fs.promises.write
    fs.writeFileSync(this.filename, JSON.stringify(this.data))
  }
  read() {
    fs.promises
      .readFile(this.filename)
      .then((data) => {
        this.data = JSON.parse(data)
        console.log("Data loaded!")
      })
      .catch((e) => console.log(e))
  }

  getLastID() {
    const l = this.data.length

    if (l < 1) return 0

    return this.data[this.data.length - 1].id
  }

  save(obj) {
    const id = this.getLastID()
    this.data.push({
      ...obj,
      ...{ id: id + 1 },
    })
    this.write()
  }

  getByID(id) {
    return this.data.find((p) => p.id == id)
  }

  getByRandom() {
    let index = Math.round(Math.random() * this.data.length)
    return this.data[index]
  }

  getAll() {
    return this.data
  }

  deleteById(id) {
    const idx = this.data.findIndex((p) => p.id == id)
    this.data.splice(idx, 1)
    this.write()
  }

  deleteAll() {
    this.data = []
    this.write()
  }
}

module.exports = Contenedor
