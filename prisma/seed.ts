import { hashSync } from "bcrypt"
import prisma from "../src/config/db"

async function main() {
  let admin = await prisma.user.create({
    data: {
      username: "grenuttag",
      password: hashSync("test1234", 12),
      email: "me@grenuttag.com",
      role: "ADMINISTRATOR",
      profile: {
        create: {
          name: "grenuttag",
          slug: "grenuttag",
          uniqueId: "188724406904684544",
        },
      },
    },
  })

  let community1 = await prisma.community.create({
    data: {
      name: "General Use",
      slug: "general-use",
      uniqueId: "356603723470077954",
    },
  })

  let community2 = await prisma.community.create({
    data: {
      name: "Da Cigar Shoppe",
      slug: "da-cigar-shoppe",
      uniqueId: "782458281225748560",
    },
  })

  let community3 = await prisma.community.create({
    data: {
      name: "Cool Cats",
      slug: "cool-cats",
      uniqueId: "769026931160383488",
    },
  })

  let testMessage = await prisma.post.create({
    data: {
      published: true,
      content: [
        {
          "speaker": "Axis",
          "message": "Hello, world!"
        },
        {
          "speaker": "grenuttag",
          "message": "This is another message. Radical!"
        },
        {
          "speaker": "ventilated",
          "message": "Talk about space age technology."
        }
      ],
      communityId: 1
    },
  })

  console.log({ admin, community1, community2, community3, testMessage })
}

main()
  .catch(error => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
