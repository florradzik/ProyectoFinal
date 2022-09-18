const passport = require("passport")
const bcryptjs = require("bcryptjs")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/User.model")
const uploadFile = require("../helpers/uploadFile")
const sendEmail = require("../helpers/send-email-registro")

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

passport.use(
  "login",
  new LocalStrategy(async (email, password, done) => {
    const user = await User.findOne({ email })
    if (!user) {
      return done(null, false)
    }
    const validPasswd = bcryptjs.compareSync(password, user.password)
    if (!validPasswd) {
      return done(null, false)
    }
    return done(null, user)
  })
)

passport.use(
  "singup",
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, email, password, done) => {
      const user = await User.findOne({ email: req.body.email })
      if (user) {
        return done(null, false)
      }

      const newUser = req.body

      const { image } = req.files
      newUser.image = await uploadFile(image, "profile-pics")
      newUser.image = "/images/profile-pics/" + newUser.image

      sendEmail(newUser)

      //Encriptar la PW:
      const salt = bcryptjs.genSaltSync()
      newUser.password = bcryptjs.hashSync(newUser.password, salt)

      await User.create(newUser)
      return done(null, newUser)
    }
  )
)
