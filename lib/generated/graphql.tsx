import { GraphQLResolveInfo } from 'graphql';
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
};

export enum HighLow {
  Low = 'LOW',
  High = 'HIGH'
}

export type Query = {
  __typename?: 'Query';
  getTelemetries?: Maybe<Array<Maybe<Telemetry>>>;
};


export type QueryGetTelemetriesArgs = {
  filter: TelemetryFilter;
};

export type Telemetry = {
  __typename?: 'Telemetry';
  id: Scalars['ID'];
  lat: Scalars['Float'];
  lng: Scalars['Float'];
  level: Scalars['Float'];
  battery: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type TelemetryFilter = {
  level?: Maybe<HighLow>;
  battery?: Maybe<HighLow>;
  online?: Maybe<YesNo>;
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
  & { getTelemetries?: Maybe<Array<Maybe<(
    { __typename?: 'Telemetry' }
    & Pick<Telemetry, 'id' | 'lat' | 'lng' | 'level' | 'battery' | 'updatedAt'>
  )>>> }
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
  HighLow: HighLow;
  Query: ResolverTypeWrapper<{}>;
  Telemetry: ResolverTypeWrapper<Telemetry>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  TelemetryFilter: TelemetryFilter;
  YesNo: YesNo;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  Telemetry: Telemetry;
  ID: Scalars['ID'];
  Float: Scalars['Float'];
  String: Scalars['String'];
  TelemetryFilter: TelemetryFilter;
  Boolean: Scalars['Boolean'];
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getTelemetries?: Resolver<Maybe<Array<Maybe<ResolversTypes['Telemetry']>>>, ParentType, ContextType, RequireFields<QueryGetTelemetriesArgs, 'filter'>>;
};

export type TelemetryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Telemetry'] = ResolversParentTypes['Telemetry']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  lat?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  lng?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  level?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  battery?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Query?: QueryResolvers<ContextType>;
  Telemetry?: TelemetryResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;


export const GetTelemetriesDocument = gql`
    query GetTelemetries($filter: TelemetryFilter!) {
  getTelemetries(filter: $filter) {
    id
    lat
    lng
    level
    battery
    updatedAt
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