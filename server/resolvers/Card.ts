import { prisma } from "../../pages/api/graphql";
export const CardResolver = {
  id: (_parent) => _parent.id,
  type: (_parent) => _parent.front_type,
  cardId: (_parent) => _parent.card_id,
  side: (_parent) => _parent.side,
  rarity: (_parent) => _parent.rarity,
  set: (_parent) => _parent.card_set,
  title: (_parent) => _parent.front_title,
  imageUrl: (_parent) => _parent.front_imageUrl,
  subType: (_parent) => _parent.front_subType,
  destiny: (_parent) => _parent.front_destiny,
  power: (_parent) => _parent.front_power,
  deploy: (_parent) => _parent.front_deploy || undefined,
  forfeit: (_parent) => _parent.front_forfeit,
  gametext: (_parent) => _parent.front_gametext,
  lore: (_parent) => _parent.front_lore,
  gemp_card_id: (_parent) => _parent.gemp_card_id,
  comments: (_parent) => {
    return prisma.comment.findMany({
      orderBy: {
        created_at: "asc",
      },
      where: {
        Card: {
          id: _parent.id,
        },
      },
    });
  },
};
