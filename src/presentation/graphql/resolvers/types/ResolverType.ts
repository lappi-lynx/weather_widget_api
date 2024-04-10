import { ForecastQueryResolvers } from './QueryResolverTypes';

type QueryResolvers = ForecastQueryResolvers;

type MutationResolvers = {};

export type ResolverType = {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
};
