import { PrismaClient } from "@prisma/client";
import { dummyDeckData } from "../utils/dummy-deck-data";
import { getSharedUser } from "../server/create-shared-user";
const prisma = new PrismaClient();

getSharedUser(prisma).then((user) => {
  dummyDeckData.map((deck) => {
    prisma.deck.create({
      data: {
        author: {
          connect: {
            id: user.id,
          },
        },
        title: deck.title,
        side: deck.side,
      },
    });
  });
});
