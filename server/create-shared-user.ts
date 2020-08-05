import { PrismaClient } from "@prisma/client";

export async function getSharedUser(prisma: PrismaClient) {
  const sharedUser = await prisma.user.findOne({
    where: {
      username: "allusers",
    },
  });
  if (sharedUser) {
    return sharedUser;
  }

  return prisma.user.create({
    data: {
      first_name: "Shared User",
      last_name: "For All Accounts",
      username: "allusers",
    },
  });
}
