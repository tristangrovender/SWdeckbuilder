import { PrismaClient } from "@prisma/client";

export async function getSharedUser(prisma: PrismaClient) {
  const sharedUser = await prisma.user.findOne({
    where: {
      email: "allusers@example.com",
    },
  });
  if (sharedUser) {
    return sharedUser;
  }

  return prisma.user.create({
    data: {
      email: "allusers@example.com",
      first_name: "Shared User",
      last_name: "For All Accounts",
      username: "allusers",
    },
  });
}
