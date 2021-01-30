import { PrismaClient } from "@prisma/client"
let prisma = new PrismaClient()

async function main() {
  let admin = await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      username: "grenuttag",
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

  let community1 = await prisma.community.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "General Use",
      slug: "general-use",
      uniqueId: "356603723470077954",
    },
  })

  let community2 = await prisma.community.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Da Cigar Shoppe",
      slug: "da-cigar-shoppe",
      uniqueId: "782458281225748560",
    },
  })

  let community3 = await prisma.community.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Cool Cats",
      slug: "cool-cats",
      uniqueId: "769026931160383488",
    },
  })
}

main()
  .catch(error => {
    throw error
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
