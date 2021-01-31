import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

import bcrypt from "bcrypt"

import prisma from "./db"

passport.use(new LocalStrategy(async (username, password, done) => {
  let user = prisma.user.findUnique({ where: { username } })

  if (!user) {
    return done(undefined, false, { message: "User not found" })
  }

}))

export default passport
