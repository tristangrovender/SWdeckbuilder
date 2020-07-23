import { PrismaClient } from "@prisma/client";

export async function createSharedUser(prisma: PrismaClient) {
  const sharedUser = await prisma.user.findOne({
    where: {
      email: "allusers@example.com",
    },
  });
  if (sharedUser) {
    return sharedUser.id;
  }

  return prisma.user.create({
    data: {
      email: "allusers@example.com",
      name: "Shared User Account",
    },
  });
}
