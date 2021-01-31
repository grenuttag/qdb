import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient({
  log: ["info", "warn"],
  errorFormat: "pretty"
})

export default prisma
