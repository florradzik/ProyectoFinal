const nodemailer = require("nodemailer")

const sendEmail = (user, pedido) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "florencia.radzik@gmail.com",
      pass: "zcxqtwdnmcqptpvk",
    },
  })

  let pedidoText = `Se ha registrado un nuevo Pedido:\n\n\n`

  pedido.forEach((product) => {
    pedidoText += `Product_id: ${product._id}\nTitulo: ${product.title}\nprecio: $${product.price}\n\n`
  })

  pedidoText += `\n\nUsuario:\n\nNombre: ${user.username}\nEmail: ${user.email}\nAddress: ${user.address}\nTelefono: ${user.phone}.`

  const mailOptions = {
    from: "Florencia Radzik - CoderHouse Challenge Node.js <florencia.radzik@gmail.com>",
    to: process.env.ADMIN_EMAIL,
    subject: "Nuevo Pedido - CoderHouse Node.js Challenge",
    text: pedidoText,
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ error })
    }
  })
}

module.exports = sendEmail
