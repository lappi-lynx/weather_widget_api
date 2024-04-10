import { readFileSync } from 'fs';
import { join } from 'path';
// NOTE: dependencies for resolvers
import { IResolvers } from '@graphql-tools/utils';
import { ResolverType } from './resolvers/types/ResolverType';
import { forecastResolver } from './resolvers/forecast.resolver';
import { WeatherService } from '../../application/services/WeatherService';
import { CacheWeatherRepo } from '../../infrastructure/repositories/CacheWeatherRepo';

const loadTypeDefs = (type: string) => {
  return readFileSync(join(__dirname, './typeDefs', `${type}.graphql`), 'utf-8');
};

const getTypeDefs = (types: string[]) => types.map(loadTypeDefs).join(' ');
export const typeDefs = getTypeDefs(['Location', 'Forecast', 'DailyForecast', 'Query']);

const weatherRepository = new CacheWeatherRepo();
const weatherService = new WeatherService(weatherRepository);

export const resolvers: IResolvers<ResolverType> = {
  Query: {
    ...forecastResolver(weatherService).Query,
  }
};
