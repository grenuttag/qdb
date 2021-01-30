import express from "express"
import { Liquid } from "liquidjs"

import PostController from "./controllers/Post"
import AccountController from "./controllers/Account"

let engine = new Liquid()
let app = express()

app.engine("liquid", engine.express())
app.set("views", "./views")
app.set("view engine", "liquid")

app.use("/quotes", PostController)
app.use("/accounts", AccountController)

app.listen(8000, () => console.log("Server is running"))
