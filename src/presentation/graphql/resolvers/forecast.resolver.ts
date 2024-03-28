import { WeatherService }   from '../../../application/services/WeatherService';
import { CacheWeatherRepo } from '../../../infrastructure/repositories/CacheWeatherRepo';
import { Location }         from '../../../domain/models/Location';
import { GetForecastByCoordinatesArgs } from './dto/ForecastResolverTypes';

const weatherRepository = new CacheWeatherRepo();
const weatherService = new WeatherService(weatherRepository);

export const forecastResolver = {
  Query: {
    getForecastByCoordinates: async (_: any, { latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
      if (days !== undefined && (days < 1 || days > 16)) {
        throw new Error("days must be a number between 1 and 16.");
      }
      const location = new Location(latitude, longitude, days);

      return weatherService.getForecastForLocation(location);
    },
  },
};

