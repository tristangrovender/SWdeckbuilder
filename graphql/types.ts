export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  recentDecks: Array<Maybe<Deck>>;
  cards: Array<Maybe<Card>>;
  deck: Deck;
};


export type QueryDeckArgs = {
  id: Scalars['ID'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  jwt: Scalars['String'];
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success: Scalars['Boolean'];
};

export type DeckCardIdResponse = {
  __typename?: 'DeckCardIDResponse';
  newDeckCardId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createDeck: Deck;
  login: LoginResponse;
  addCardToDeck: DeckCardIdResponse;
  removeCardFromDeck: SuccessResponse;
};


export type MutationCreateDeckArgs = {
  side: Side;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type MutationAddCardToDeckArgs = {
  deckId: Scalars['ID'];
  cardId: Scalars['ID'];
};


export type MutationRemoveCardFromDeckArgs = {
  deckCardId: Scalars['ID'];
};

export enum Side {
  Dark = 'Dark',
  Light = 'Light'
}


export type Deck = {
  __typename?: 'Deck';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  side: Side;
  title: Scalars['String'];
  description: Scalars['String'];
  author: User;
  averageRating?: Maybe<Scalars['Float']>;
  test: Scalars['String'];
  cards: Array<Maybe<Card>>;
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  card_id: Scalars['String'];
  side: Side;
  rarity: Scalars['String'];
  set: Scalars['String'];
  title: Scalars['String'];
  type: Scalars['String'];
  imageUrl: Scalars['String'];
  subType?: Maybe<Scalars['String']>;
  destiny?: Maybe<Scalars['String']>;
  power?: Maybe<Scalars['String']>;
  deploy?: Maybe<Scalars['String']>;
  forfeit?: Maybe<Scalars['String']>;
  gametext?: Maybe<Scalars['String']>;
  lore?: Maybe<Scalars['String']>;
  gemp_card_id?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type AddCardToDeckMutationVariables = Exact<{
  deckId: Scalars['ID'];
  cardId: Scalars['ID'];
}>;


export type AddCardToDeckMutation = (
  { __typename?: 'Mutation' }
  & { addCardToDeck: (
    { __typename?: 'DeckCardIDResponse' }
    & Pick<DeckCardIdResponse, 'newDeckCardId'>
  ) }
);

export type CreateDeckMutationVariables = Exact<{
  side: Side;
}>;


export type CreateDeckMutation = (
  { __typename?: 'Mutation' }
  & { createDeck: (
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'side'>
  ) }
);

export type GetCardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCardsQuery = (
  { __typename?: 'Query' }
  & { cards: Array<Maybe<(
    { __typename?: 'Card' }
    & Pick<Card, 'id' | 'type' | 'card_id' | 'deploy' | 'destiny' | 'forfeit' | 'gametext' | 'imageUrl' | 'lore' | 'power' | 'rarity' | 'set' | 'side' | 'subType' | 'title' | 'gemp_card_id'>
  )>> }
);

export type GetRecentDecksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentDecksQuery = (
  { __typename?: 'Query' }
  & { recentDecks: Array<Maybe<(
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'side' | 'title' | 'description' | 'createdAt' | 'averageRating'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'username'>
    ), cards: Array<Maybe<(
      { __typename?: 'Card' }
      & Pick<Card, 'id' | 'type'>
    )>> }
  )>> }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'jwt'>
  ) }
);
