import { PrismaClient } from "@prisma/client";
import { dummyDeckData } from "../utils/dummy-deck-data";
import { getSharedUser } from "../server/create-shared-user";
import { Card } from "../components/card-search-table/card.interface";
const cards = require("../cards/cards.json");
const prisma = new PrismaClient();

function mapToString(val: any): string {
  return val === undefined || val === null ? undefined : val.toString();
}

function createCards(prisma, allCards) {
  return allCards
    .filter(({ legacy }) => {
      return legacy == false;
    })
    .map((card: Card) => {
      return prisma.card.create({
        data: {
          card_id: card.id,
          side: card.side,
          rarity: card.rarity,
          set: card.set,
          front_title: card.front.title,
          front_imageurl: card.front.imageUrl,
          front_type: card.front.type,
          front_subtype: card.front.subType,
          front_destiny: mapToString(card.front.destiny),
          front_power: mapToString(card.front.power),
          front_deploy: mapToString(card.front.deploy),
          front_forfeit: mapToString(card.front.forfeit),
          front_gametext: card.front.gametext,
          front_lore: card.front.lore,
          counterpart: card.counterpart,
        },
      });
    });
}

function createDecks(userId, dummyDeckData) {
  return dummyDeckData.map((deck) => {
    return prisma.deck.create({
      data: {
        User: {
          connect: {
            id: userId,
          },
        },
        title: deck.title,
        side: deck.side,
      },
    });
  });
}

getSharedUser(prisma).then((user) => {
  const createcards = createCards(prisma, cards);
  const createdDecks = createDecks(user.id, dummyDeckData);
  Promise.all([...createdDecks, ...createcards]).then(() => {
    prisma.disconnect();
    console.log("Created decks & cards");
  });
});
