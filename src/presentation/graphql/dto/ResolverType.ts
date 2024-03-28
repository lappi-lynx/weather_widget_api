import { ForecastQueryResolvers } from './../resolvers/dto/ForecastResolverTypes';

type QueryResolvers = ForecastQueryResolvers;

type MutationResolvers = {};

export type ResolverType = {
  Query: QueryResolvers;
  Mutation: MutationResolvers;
};
