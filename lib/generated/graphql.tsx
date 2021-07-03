import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  ObjectID: any;
};

export type Contact = {
  __typename?: 'Contact';
  _id: Scalars['ObjectID'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  archived?: Maybe<Scalars['Boolean']>;
};

export type ContactFilter = {
  archived?: Maybe<Scalars['Boolean']>;
};

export type ContactInput = {
  _id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};


export enum HighLow {
  Low = 'LOW',
  High = 'HIGH'
}

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  saveContact?: Maybe<Contact>;
  updateTelemetry: Scalars['Boolean'];
};


export type MutationSaveContactArgs = {
  contact: ContactInput;
};


export type MutationUpdateTelemetryArgs = {
  telemetry: TelemetryUpdate;
};


export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getContact?: Maybe<Contact>;
  getContacts: Array<Contact>;
  getTelemetries: Array<TelemetryWithMetadata>;
  getTelemetry?: Maybe<Telemetry>;
};


export type QueryGetContactArgs = {
  id: Scalars['ID'];
};


export type QueryGetContactsArgs = {
  filter?: Maybe<ContactFilter>;
};


export type QueryGetTelemetriesArgs = {
  filter: TelemetryFilter;
};


export type QueryGetTelemetryArgs = {
  ID: Scalars['ObjectID'];
};

export type Telemetry = {
  __typename?: 'Telemetry';
  _id: Scalars['ObjectID'];
  deviceId: Scalars['String'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  level: Scalars['Float'];
  battery: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  contactID?: Maybe<Scalars['ObjectID']>;
};

export type TelemetryFilter = {
  level?: Maybe<HighLow>;
  battery?: Maybe<HighLow>;
  online?: Maybe<YesNo>;
  sort?: Maybe<TelemetrySort>;
};

export type TelemetryMetadata = {
  __typename?: 'TelemetryMetadata';
  score: Scalars['Float'];
};

export enum TelemetrySort {
  Urgent = 'URGENT',
  Newest = 'NEWEST',
  Oldest = 'OLDEST',
  BatteryLow = 'BATTERY_LOW',
  BatteryHigh = 'BATTERY_HIGH',
  LevelLow = 'LEVEL_LOW',
  LevelHigh = 'LEVEL_HIGH'
}

export type TelemetryUpdate = {
  _id: Scalars['ObjectID'];
  contactID: Scalars['ObjectID'];
};

export type TelemetryWithMetadata = {
  __typename?: 'TelemetryWithMetadata';
  telemetry: Telemetry;
  meta?: Maybe<TelemetryMetadata>;
};

export enum YesNo {
  Yes = 'YES',
  No = 'NO'
}

export type GetTelemetriesQueryVariables = Exact<{
  filter: TelemetryFilter;
}>;


export type GetTelemetriesQuery = (
  { __typename?: 'Query' }
  & { getTelemetries: Array<(
    { __typename?: 'TelemetryWithMetadata' }
    & { telemetry: (
      { __typename?: 'Telemetry' }
      & Pick<Telemetry, '_id' | 'deviceId' | 'lat' | 'lng' | 'level' | 'battery' | 'updatedAt' | 'contactID'>
    ), meta?: Maybe<(
      { __typename?: 'TelemetryMetadata' }
      & Pick<TelemetryMetadata, 'score'>
    )> }
  )> }
);

export type GetTelemetryQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;


export type GetTelemetryQuery = (
  { __typename?: 'Query' }
  & { getTelemetry?: Maybe<(
    { __typename?: 'Telemetry' }
    & Pick<Telemetry, '_id' | 'deviceId' | 'lat' | 'lng' | 'level' | 'battery' | 'updatedAt' | 'contactID'>
  )> }
);

export type GetContactsQueryVariables = Exact<{
  filter?: Maybe<ContactFilter>;
}>;


export type GetContactsQuery = (
  { __typename?: 'Query' }
  & { getContacts: Array<(
    { __typename?: 'Contact' }
    & Pick<Contact, '_id' | 'name' | 'phone' | 'updatedAt'>
  )> }
);

export type SaveContactMutationVariables = Exact<{
  contact: ContactInput;
}>;


export type SaveContactMutation = (
  { __typename?: 'Mutation' }
  & { saveContact?: Maybe<(
    { __typename?: 'Contact' }
    & Pick<Contact, '_id' | 'name' | 'phone' | 'updatedAt'>
  )> }
);

export type SaveTelemetryMutationVariables = Exact<{
  telemetry: TelemetryUpdate;
}>;


export type SaveTelemetryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateTelemetry'>
);



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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Contact: ResolverTypeWrapper<Contact>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ContactFilter: ContactFilter;
  ContactInput: ContactInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  HighLow: HighLow;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  Query: ResolverTypeWrapper<{}>;
  Telemetry: ResolverTypeWrapper<Telemetry>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  TelemetryFilter: TelemetryFilter;
  TelemetryMetadata: ResolverTypeWrapper<TelemetryMetadata>;
  TelemetrySort: TelemetrySort;
  TelemetryUpdate: TelemetryUpdate;
  TelemetryWithMetadata: ResolverTypeWrapper<TelemetryWithMetadata>;
  YesNo: YesNo;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Contact: Contact;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  ContactFilter: ContactFilter;
  ContactInput: ContactInput;
  ID: Scalars['ID'];
  DateTime: Scalars['DateTime'];
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  Query: {};
  Telemetry: Telemetry;
  Float: Scalars['Float'];
  TelemetryFilter: TelemetryFilter;
  TelemetryMetadata: TelemetryMetadata;
  TelemetryUpdate: TelemetryUpdate;
  TelemetryWithMetadata: TelemetryWithMetadata;
};

export type ContactResolvers<ContextType = any, ParentType extends ResolversParentTypes['Contact'] = ResolversParentTypes['Contact']> = {
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  archived?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  saveContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<MutationSaveContactArgs, 'contact'>>;
  updateTelemetry?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateTelemetryArgs, 'telemetry'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  getContact?: Resolver<Maybe<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryGetContactArgs, 'id'>>;
  getContacts?: Resolver<Array<ResolversTypes['Contact']>, ParentType, ContextType, RequireFields<QueryGetContactsArgs, never>>;
  getTelemetries?: Resolver<Array<ResolversTypes['TelemetryWithMetadata']>, ParentType, ContextType, RequireFields<QueryGetTelemetriesArgs, 'filter'>>;
  getTelemetry?: Resolver<Maybe<ResolversTypes['Telemetry']>, ParentType, ContextType, RequireFields<QueryGetTelemetryArgs, 'ID'>>;
};

export type TelemetryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Telemetry'] = ResolversParentTypes['Telemetry']> = {
  _id?: Resolver<ResolversTypes['ObjectID'], ParentType, ContextType>;
  deviceId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  battery?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  contactID?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TelemetryMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TelemetryMetadata'] = ResolversParentTypes['TelemetryMetadata']> = {
  score?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TelemetryWithMetadataResolvers<ContextType = any, ParentType extends ResolversParentTypes['TelemetryWithMetadata'] = ResolversParentTypes['TelemetryWithMetadata']> = {
  telemetry?: Resolver<ResolversTypes['Telemetry'], ParentType, ContextType>;
  meta?: Resolver<Maybe<ResolversTypes['TelemetryMetadata']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Contact?: ContactResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Telemetry?: TelemetryResolvers<ContextType>;
  TelemetryMetadata?: TelemetryMetadataResolvers<ContextType>;
  TelemetryWithMetadata?: TelemetryWithMetadataResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const GetTelemetriesDocument = gql`
    query GetTelemetries($filter: TelemetryFilter!) {
  getTelemetries(filter: $filter) {
    telemetry {
      _id
      deviceId
      lat
      lng
      level
      battery
      updatedAt
      contactID
    }
    meta {
      score
    }
  }
}
    `;

/**
 * __useGetTelemetriesQuery__
 *
 * To run a query within a React component, call `useGetTelemetriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTelemetriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTelemetriesQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetTelemetriesQuery(baseOptions: Apollo.QueryHookOptions<GetTelemetriesQuery, GetTelemetriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTelemetriesQuery, GetTelemetriesQueryVariables>(GetTelemetriesDocument, options);
      }
export function useGetTelemetriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTelemetriesQuery, GetTelemetriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTelemetriesQuery, GetTelemetriesQueryVariables>(GetTelemetriesDocument, options);
        }
export type GetTelemetriesQueryHookResult = ReturnType<typeof useGetTelemetriesQuery>;
export type GetTelemetriesLazyQueryHookResult = ReturnType<typeof useGetTelemetriesLazyQuery>;
export type GetTelemetriesQueryResult = Apollo.QueryResult<GetTelemetriesQuery, GetTelemetriesQueryVariables>;
export const GetTelemetryDocument = gql`
    query GetTelemetry($id: ObjectID!) {
  getTelemetry(ID: $id) {
    _id
    deviceId
    lat
    lng
    level
    battery
    updatedAt
    contactID
  }
}
    `;

/**
 * __useGetTelemetryQuery__
 *
 * To run a query within a React component, call `useGetTelemetryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTelemetryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTelemetryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTelemetryQuery(baseOptions: Apollo.QueryHookOptions<GetTelemetryQuery, GetTelemetryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTelemetryQuery, GetTelemetryQueryVariables>(GetTelemetryDocument, options);
      }
export function useGetTelemetryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTelemetryQuery, GetTelemetryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTelemetryQuery, GetTelemetryQueryVariables>(GetTelemetryDocument, options);
        }
export type GetTelemetryQueryHookResult = ReturnType<typeof useGetTelemetryQuery>;
export type GetTelemetryLazyQueryHookResult = ReturnType<typeof useGetTelemetryLazyQuery>;
export type GetTelemetryQueryResult = Apollo.QueryResult<GetTelemetryQuery, GetTelemetryQueryVariables>;
export const GetContactsDocument = gql`
    query GetContacts($filter: ContactFilter) {
  getContacts(filter: $filter) {
    _id
    name
    phone
    updatedAt
  }
}
    `;

/**
 * __useGetContactsQuery__
 *
 * To run a query within a React component, call `useGetContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useGetContactsQuery(baseOptions?: Apollo.QueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
      }
export function useGetContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactsQuery, GetContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactsQuery, GetContactsQueryVariables>(GetContactsDocument, options);
        }
export type GetContactsQueryHookResult = ReturnType<typeof useGetContactsQuery>;
export type GetContactsLazyQueryHookResult = ReturnType<typeof useGetContactsLazyQuery>;
export type GetContactsQueryResult = Apollo.QueryResult<GetContactsQuery, GetContactsQueryVariables>;
export const SaveContactDocument = gql`
    mutation SaveContact($contact: ContactInput!) {
  saveContact(contact: $contact) {
    _id
    name
    phone
    updatedAt
  }
}
    `;
export type SaveContactMutationFn = Apollo.MutationFunction<SaveContactMutation, SaveContactMutationVariables>;

/**
 * __useSaveContactMutation__
 *
 * To run a mutation, you first call `useSaveContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveContactMutation, { data, loading, error }] = useSaveContactMutation({
 *   variables: {
 *      contact: // value for 'contact'
 *   },
 * });
 */
export function useSaveContactMutation(baseOptions?: Apollo.MutationHookOptions<SaveContactMutation, SaveContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveContactMutation, SaveContactMutationVariables>(SaveContactDocument, options);
      }
export type SaveContactMutationHookResult = ReturnType<typeof useSaveContactMutation>;
export type SaveContactMutationResult = Apollo.MutationResult<SaveContactMutation>;
export type SaveContactMutationOptions = Apollo.BaseMutationOptions<SaveContactMutation, SaveContactMutationVariables>;
export const SaveTelemetryDocument = gql`
    mutation SaveTelemetry($telemetry: TelemetryUpdate!) {
  updateTelemetry(telemetry: $telemetry)
}
    `;
export type SaveTelemetryMutationFn = Apollo.MutationFunction<SaveTelemetryMutation, SaveTelemetryMutationVariables>;

/**
 * __useSaveTelemetryMutation__
 *
 * To run a mutation, you first call `useSaveTelemetryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveTelemetryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveTelemetryMutation, { data, loading, error }] = useSaveTelemetryMutation({
 *   variables: {
 *      telemetry: // value for 'telemetry'
 *   },
 * });
 */
export function useSaveTelemetryMutation(baseOptions?: Apollo.MutationHookOptions<SaveTelemetryMutation, SaveTelemetryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveTelemetryMutation, SaveTelemetryMutationVariables>(SaveTelemetryDocument, options);
      }
export type SaveTelemetryMutationHookResult = ReturnType<typeof useSaveTelemetryMutation>;
export type SaveTelemetryMutationResult = Apollo.MutationResult<SaveTelemetryMutation>;
export type SaveTelemetryMutationOptions = Apollo.BaseMutationOptions<SaveTelemetryMutation, SaveTelemetryMutationVariables>;