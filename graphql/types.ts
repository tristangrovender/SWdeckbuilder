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
};

export type Mutation = {
  __typename?: 'Mutation';
  createDeck?: Maybe<Deck>;
};


export type MutationCreateDeckArgs = {
  side?: Maybe<Side>;
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
  type: Scalars['String'];
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


export type CreateDeckMutationVariables = Exact<{
  side?: Maybe<Side>;
}>;


export type CreateDeckMutation = (
  { __typename?: 'Mutation' }
  & { createDeck?: Maybe<(
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'side'>
  )> }
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
