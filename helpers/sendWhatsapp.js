const twilio = require("twilio")

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const adminNum = process.env.ADMIN_PHONE
const client = twilio(accountSid, authToken)

const sendWpp = (user, pedido) => {
  let pedidoText = `Se ha registrado un nuevo Pedido:\n\n\n`

  pedido.forEach((product) => {
    pedidoText += `Product_id: ${product._id}\nTitulo: ${product.title}\nprecio: $${product.price}\n\n`
  })

  pedidoText += `\n\nUsuario:\n\nNombre: ${user.username}\nEmail: ${user.email}\nAddress: ${user.address}\nTelefono: ${user.phone}.`

  client.messages
    .create({
      body: pedidoText,
      from: "whatsapp:+14155238886",
      to: `whatsapp:${adminNum}`,
    })
    .then((message) => console.log(message.sid))
    .done()
}

module.exports = sendWpp
