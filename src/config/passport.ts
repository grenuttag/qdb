import { User } from "@prisma/client";
import bcrypt from "bcrypt"

import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

import prisma from "./db"

passport.serializeUser<any, any>((user: User, done) => {
  // @ts-ignore
  done(undefined, user.id);
});

passport.deserializeUser(async (id: number, done) => {
  let user = prisma.user.findUnique({ where: { id } })
  if (user) {
    done(undefined, user);
  }
});

passport.use(new LocalStrategy(async (username, password, done) => {
  // Find user in database, if no user is found then we're done here
  let user = await prisma.user.findUnique({ where: { username } })

  if (!user) {
    return done(undefined, false, { message: "User not found" })
  }

  // Check if password provided matches the one retrieved from the database
  let isValidPassword = bcrypt.compareSync(password, user.password)

  if (isValidPassword) {
    return done(undefined, user)
  } else {
    return done(undefined, false, { message: "Password does not match" })
  }
}))

export default passport
