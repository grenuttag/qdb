import Session from "express-session"
import { PrismaSessionStore } from "@quixo3/prisma-session-store"

import prisma from "./db"

let ONE_WEEK = 7 * 24 * 60 * 60
let TWO_HOURS = 2 * 60

let session = Session({
  resave: false,
  cookie: {
    maxAge: ONE_WEEK * 1000
  },
  secret: process.env.SECRET_KEY || "secret1234",
  store: new PrismaSessionStore(prisma, {
    checkPeriod: TWO_HOURS * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
  saveUninitialized: false
})

export default session
