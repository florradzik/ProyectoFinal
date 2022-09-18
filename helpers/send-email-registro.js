const nodemailer = require("nodemailer")

const sendEmail = (newUser) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "florencia.radzik@gmail.com",
      pass: "zcxqtwdnmcqptpvk",
    },
  })

  const mailOptions = {
    from: "Florencia Radzik - CoderHouse Challenge Node.js <florencia.radzik@gmail.com>",
    to: process.env.ADMIN_EMAIL,
    subject: "Nuevo Registro - CoderHouse Node.js Challenge",
    text: `Se ha registrado un nuevo registro:\n\nEmail: ${newUser.email}\nNombre: ${newUser.username}\nAddress: ${newUser.address}\nEdad: ${newUser.age}\nTelefono: ${newUser.phone}\n\nEmail Enviado desde Node-Mailer.`,
  }

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return res.status(500).json({ error })
    }
  })
}

module.exports = sendEmail
