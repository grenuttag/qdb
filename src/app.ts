import express from "express"
import { Liquid } from "liquidjs"

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

app.use(express.urlencoded({ extended: true }))

app.use("/posts", PostController)
app.use("/accounts", AccountController)
app.use("/profiles", ProfileController)

export default app
