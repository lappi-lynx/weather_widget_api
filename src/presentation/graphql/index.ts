import { readFileSync } from 'fs';
import { join } from 'path';
import { IResolvers } from '@graphql-tools/utils';
import { ResolverType } from './dto/ResolverType';
import { forecastResolver } from './resolvers/forecast.resolver';

const loadTypeDefs = (type: string) => {
  return readFileSync(join(__dirname, './typeDefs', `${type}.graphql`), 'utf-8');
};

const getTypeDefs = (types: string[]) => types.map(loadTypeDefs).join(' ');
export const typeDefs = getTypeDefs(['Location', 'Forecast', 'DailyForecast', 'Query']);

export const resolvers: IResolvers<ResolverType> = {
  Query: {
    ...forecastResolver.Query,
  }
};
