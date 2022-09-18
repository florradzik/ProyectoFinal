const twilio = require("twilio")

const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
const num = process.env.TWILIO_TRIAL_NUM
const client = twilio(accountSid, authToken)

const sendSms = async (user) => {
  const resp = await client.messages.create({
    body: `Hola ${user.username}! Tu pedido se ha recibido con exito y se encuentra en proceso.`,
    from: num,
    to: user.phone,
  })

  // console.log(resp)
}

module.exports = sendSms
