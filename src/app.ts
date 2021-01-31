import express from "express"

import { Liquid } from "liquidjs"

import session from "./config/session"
import passport from "./config/passport"

import PostController from "./controllers/Post"
import AccountController from "./controllers/Account"
import ProfileController from "./controllers/Profile"

let engine = new Liquid({
  root: __dirname,
  extname: ".liquid"
})

let app = express()

app.engine("liquid", engine.express())
app.set("views", "../views")
app.set("view engine", "liquid")

app.use(express.urlencoded({ extended: false }))

// Authentication
app.use(session)
app.use(passport.initialize())
app.use(passport.session())

// Route Controllers
app.use("/posts", PostController)
app.use("/accounts", AccountController)
app.use("/profiles", ProfileController)

export default app
