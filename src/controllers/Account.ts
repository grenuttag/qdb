import Router from "express"
import { hashSync } from "bcrypt"

import prisma from "../config/db"

let Account = Router()

Account.route("/register")
  .get((request, response) => {
    response.render("accounts/register")
  })

  .post((request, response) => {
    response.send("Register account POST")
  })

Account.route("/login")
  .get((request, response) => {
    response.render("accounts/login")
  })

  .post((request, response) => {
    let { username, password, email } = request.body
    password = hashSync(password, 12)

    let user = prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    })

    response.send("Login account POST")
  })

export default Account
