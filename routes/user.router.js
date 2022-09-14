const { Router } = require("express")

const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")

const routes = require("../helpers/login")

const UserModel = require("../models/user.model")
const fileUpload = require("express-fileupload")
const routerUser = Router()

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (err, user) => {
      if (err) return done(err)
      if (!user) console.log("User not found ")

      return done(null, user)
    })
  })
)

passport.use(
  "signup",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log("signup...")

      Users.findOne({ username }, (err, user) => {
        if (err) return done(err)
        if (user) {
          console.log("User already exists")
          return done(null, false)
        }

        const newUser = { username, password, name: req.body.name }
        Users.create(newUser, (err, userWithID) => {
          if (err) return done(err)

          console.log(userWithID)
          return done(null, userWithID)
        })
      })
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  Users.findById(id, done)
})

routerUser.post("/", (req, res) => {
  data = req.body
  data["avatar"] = ""
  const user = new UserModel(req.body)
  user
    .save()
    .then(() => res.json(user))
    .catch((e) => res.json(e))
})

routerUser.post("/upload", fileUpload(), (req, res) => {
  UserModel.find(req.params.email ? { email: req.params.email } : {})
    .then((user) => {
      if (!req.files)
        return res.statusCode(400).send({ message: "No file uploaded" })

      let avatar = req.files.avatar
      const filenameFinal = "./public/" + avatar.name
      avatar.mv(filenameFinal)

      user.avatar = filenameFinal
      user
        .save()
        .then(() => res.json(user))
        .catch((e) => res.json(e))
    })
    .catch((e) => res.send(e))
})

routerUser.get("/:email?", (req, res) => {
  UserModel.find(req.params.email ? { email: req.params.email } : {})
    .then((user) => res.json(user))
    .catch((e) => res.send(e))
})

routerUser.get("/", routes.getRoot)

routerUser.get("/login", routes.getLogin)
routerUser.post("/login", passport.authenticate("login"), routes.postLogin)

routerUser.get("/signup", routes.getSignup)
routerUser.post(
  "/signup",
  passport.authenticate("signup", { failureRedirect: "/failsignup" }),
  routes.postSignup
)
routerUser.get("/failsignup", routes.getFailsignup)

module.exports = routerUser
