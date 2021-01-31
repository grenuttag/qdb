import Router from "express"
import prisma from "../config/db"

let Profile = Router()

Profile.get("/", (request, response) => response.send("Viewing profile"))

export default Profile
