import Router from "express"

import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient()

let Profile = Router()

Profile.get("/", (request, response) => response.send("Viewing profile"))

export default Profile
