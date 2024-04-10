import { readFileSync } from 'fs';
import { join } from 'path';
// NOTE: dependencies for resolvers
import { IResolvers } from '@graphql-tools/utils';
import { ResolverType } from './resolvers/types/ResolverType';
import { forecastResolver } from './resolvers/forecast.resolver';
import { WeatherService } from '../../application/services/WeatherService';
import { CachedWeatherManager } from '../../infrastructure/services/CachedWeatherManager';
import { MeteoService } from './../../infrastructure/services/MeteoService';
import Redis from 'ioredis';

const loadTypeDefs = (type: string) => {
  return readFileSync(join(__dirname, './typeDefs', `${type}.graphql`), 'utf-8');
};

const getTypeDefs = (types: string[]) => types.map(loadTypeDefs).join(' ');
export const typeDefs = getTypeDefs(['Location', 'Forecast', 'DailyForecast', 'Query']);

const redisClient          = new Redis();
const meteoServiceInstance = new MeteoService();
const weatherRepository    = new CachedWeatherManager(redisClient, meteoServiceInstance);
const weatherService       = new WeatherService(weatherRepository);

export const resolvers: IResolvers<ResolverType> = {
  Query: {
    ...forecastResolver(weatherService).Query,
  }
};
