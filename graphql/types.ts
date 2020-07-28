import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  deckCards: Array<Maybe<DeckCard>>;
};

export type DeckCard = {
  __typename?: 'DeckCard';
  id: Scalars['ID'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  card: Card;
  deck: Deck;
  isInSideDeck: Scalars['Boolean'];
};

export type Card = {
  __typename?: 'Card';
  id: Scalars['ID'];
  cardId: Scalars['String'];
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
    & Pick<Card, 'id' | 'type' | 'cardId' | 'deploy' | 'destiny' | 'forfeit' | 'gametext' | 'imageUrl' | 'lore' | 'power' | 'rarity' | 'set' | 'side' | 'subType' | 'title' | 'gemp_card_id'>
  )>> }
);

export type GetDeckQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetDeckQuery = (
  { __typename?: 'Query' }
  & { deck: (
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'title' | 'side'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), deckCards: Array<Maybe<(
      { __typename?: 'DeckCard' }
      & Pick<DeckCard, 'id' | 'createdAt' | 'isInSideDeck'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'cardId' | 'side' | 'rarity' | 'set' | 'title' | 'type' | 'imageUrl' | 'subType' | 'destiny' | 'power' | 'deploy' | 'forfeit' | 'gametext' | 'lore' | 'gemp_card_id'>
      ) }
    )>> }
  ) }
);

export type GetRecentDecksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRecentDecksQuery = (
  { __typename?: 'Query' }
  & { recentDecks: Array<Maybe<(
    { __typename?: 'Deck' }
    & Pick<Deck, 'id' | 'side' | 'title' | 'description' | 'createdAt' | 'averageRating'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    ), deckCards: Array<Maybe<(
      { __typename?: 'DeckCard' }
      & Pick<DeckCard, 'id'>
      & { card: (
        { __typename?: 'Card' }
        & Pick<Card, 'id' | 'type'>
      ) }
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

export type RemoveCardFromDeckMutationVariables = Exact<{
  deckCardId: Scalars['ID'];
}>;


export type RemoveCardFromDeckMutation = (
  { __typename?: 'Mutation' }
  & { removeCardFromDeck: (
    { __typename?: 'SuccessResponse' }
    & Pick<SuccessResponse, 'success'>
  ) }
);

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  SuccessResponse: ResolverTypeWrapper<SuccessResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  DeckCardIDResponse: ResolverTypeWrapper<DeckCardIdResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Side: Side;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Deck: ResolverTypeWrapper<Deck>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  DeckCard: ResolverTypeWrapper<DeckCard>;
  Card: ResolverTypeWrapper<Card>;
  User: ResolverTypeWrapper<User>;
  CacheControlScope: CacheControlScope;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  String: Scalars['String'];
  ID: Scalars['ID'];
  LoginResponse: LoginResponse;
  SuccessResponse: SuccessResponse;
  Boolean: Scalars['Boolean'];
  DeckCardIDResponse: DeckCardIdResponse;
  Mutation: {};
  Date: Scalars['Date'];
  Deck: Deck;
  Float: Scalars['Float'];
  DeckCard: DeckCard;
  Card: Card;
  User: User;
  Upload: Scalars['Upload'];
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  recentDecks?: Resolver<Array<Maybe<ResolversTypes['Deck']>>, ParentType, ContextType>;
  cards?: Resolver<Array<Maybe<ResolversTypes['Card']>>, ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType, RequireFields<QueryDeckArgs, 'id'>>;
}>;

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  jwt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type SuccessResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SuccessResponse'] = ResolversParentTypes['SuccessResponse']> = ResolversObject<{
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DeckCardIdResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeckCardIDResponse'] = ResolversParentTypes['DeckCardIDResponse']> = ResolversObject<{
  newDeckCardId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createDeck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType, RequireFields<MutationCreateDeckArgs, 'side'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
  addCardToDeck?: Resolver<ResolversTypes['DeckCardIDResponse'], ParentType, ContextType, RequireFields<MutationAddCardToDeckArgs, 'deckId' | 'cardId'>>;
  removeCardFromDeck?: Resolver<ResolversTypes['SuccessResponse'], ParentType, ContextType, RequireFields<MutationRemoveCardFromDeckArgs, 'deckCardId'>>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeckResolvers<ContextType = any, ParentType extends ResolversParentTypes['Deck'] = ResolversParentTypes['Deck']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  side?: Resolver<ResolversTypes['Side'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  averageRating?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  deckCards?: Resolver<Array<Maybe<ResolversTypes['DeckCard']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type DeckCardResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeckCard'] = ResolversParentTypes['DeckCard']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  card?: Resolver<ResolversTypes['Card'], ParentType, ContextType>;
  deck?: Resolver<ResolversTypes['Deck'], ParentType, ContextType>;
  isInSideDeck?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type CardResolvers<ContextType = any, ParentType extends ResolversParentTypes['Card'] = ResolversParentTypes['Card']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  cardId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  side?: Resolver<ResolversTypes['Side'], ParentType, ContextType>;
  rarity?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  set?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  destiny?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  power?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  deploy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  forfeit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gametext?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lore?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gemp_card_id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  SuccessResponse?: SuccessResponseResolvers<ContextType>;
  DeckCardIDResponse?: DeckCardIdResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Deck?: DeckResolvers<ContextType>;
  DeckCard?: DeckCardResolvers<ContextType>;
  Card?: CardResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Upload?: GraphQLScalarType;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
