import Router, { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
let quote = Router()

quote.get("/", async (req: Request, res: Response) => {
  let quotes = await prisma.post.findMany({
    where: { published: true },
  })

  res.json(quotes)
})

quote.get("/:id", async (req: Request, res: Response) => {
  let { id } = req.params
  res.send(`Displaying quote ${id}`)
})

export default quote
