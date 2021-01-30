import Router from "express"
import { PrismaClient } from "@prisma/client"

let prisma = new PrismaClient()
let Post = Router()

Post.get("/", async (_request, response) => {
  let posts = await prisma.post.findMany({
    where: { published: true },
  })

  response.json(posts)
})

Post.get("/:id", async (request, response) => {
  let id = parseInt(request.params.id)
  let post = await prisma.post.findUnique({
    where: { id },
    include: {
      community: true,
      participants: true
    }
  })

  if (post) {
    response.json(post)
  } else {
    response.status(404).send("Quote not found")
  }
})

export default Post
