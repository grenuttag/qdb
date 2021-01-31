import Router from "express"
import slugify from "slugify"
import { hashSync } from "bcrypt"

import prisma from "../config/db"
import passport from "../config/passport"

import { User } from "@prisma/client"

let Account = Router()

Account.get("/register", (_request, response) =>
  response.render("accounts/register")
)

Account.get("/login", (_request, response) =>
  response.render("accounts/login")
)

Account.post("/login", async (request, response) => {
  // TODO: Add validation on form data before authenticating

  passport.authenticate("local", (error: Error, user: User, info) => {
    if (error) { console.log("Error") }
    if (!user) { console.log("Username not found") }

    request.login(user, error => {
      if (error) { console.log(error, "Error") }

      return response.redirect("/")
    })
  })
})

Account.post("/register", async (request, response, next) => {
  // TODO: Add validation before registration

  console.log(request.body)

  let { username, password, email } = request.body
  password = hashSync(password, 12)

  // Create a new user and connect it to an existing profile
  // or create a new one
  let user = await prisma.user.create({
    data: {
      username,
      password,
      email,
      profile: {
        connectOrCreate: {
          where: { name: username },
          create: {
            name: username,
            slug: slugify(username),
            uniqueId: "NOT_LINKED"
          }
        }
      }
    }
  })

  if (user) {
    response.redirect("/")
  }
})

export default Account
