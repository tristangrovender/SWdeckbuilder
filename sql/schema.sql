CREATE TABLE "public"."User"
(
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE "public"."Deck"
(
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  title VARCHAR(255),
  side VARCHAR(255),
  description VARCHAR(8000),
  "authorId" INTEGER NOT NULL, FOREIGN KEY ("authorId") REFERENCES "public"."User"(id)
);

CREATE TABLE "public"."DeckCard"(
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "cardId" INTEGER NOT NULL, FOREIGN KEY ("cardId") REFERENCES "public"."Card"(id),
  "deckId" INTEGER NOT NULL, FOREIGN KEY ("deckId") REFERENCES "public"."Deck"(id),
  is_in_side_deck Boolean DEFAULT false,
  is_starting_card Boolean DEFAULT false
);

create table "public"."Card" (
	id SERIAL PRIMARY KEY NOT NULL,
	card_id int,
	side VARCHAR(255),
	rarity VARCHAR(255),
	set VARCHAR(255),
	front_title VARCHAR(1000),
	front_imageUrl VARCHAR(255),
	front_type VARCHAR(255),
	front_subType VARCHAR(255),
	front_destiny VARCHAR(255),
	front_power VARCHAR(255),
  front_deploy VARCHAR(255),
	front_forfeit VARCHAR(255),
	front_gametext VARCHAR(5000),
	front_lore VARCHAR(5000),
	counterpart VARCHAR(255),
	gemp_card_id VARCHAR(255)
);
