import Router from "express"

import prisma from "../config/db"

let Account = Router()

Account.get("/register", async (request, response) => {
  response.send("Create an account")
})

Account.get("/login", async (request, response) => {
  response.send("Login to an account")
})

export default Account
