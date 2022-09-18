const path = require("path")
const { v4: uuidv4 } = require("uuid")

const uploadFile = (image, folder) => {
  const validExtensions = ["jpg", "jpeg", "png"]

  return new Promise((resolve, reject) => {
    //validamos la extension del archivo:
    let extension = image.name.split(".")
    extension = extension[extension.length - 1]

    if (!validExtensions.includes(extension)) {
      return reject(
        `Bad extension: ${extension}. Please use: ${validExtensions}`
      )
    }

    //Le asignamos un nombre unico al archivo mediante la libreria UUID y creamos la ruta:
    const nombreTemp = uuidv4() + "." + extension
    const uploadPath = path.join(
      __dirname,
      "../public/uploads/",
      folder,
      nombreTemp
    )

    //Movemos el archivo y devolvemos la ruta:
    image.mv(uploadPath, (err) => {
      if (err) return reject(err)
    })

    resolve(nombreTemp)
  })
}

module.exports = uploadFile
