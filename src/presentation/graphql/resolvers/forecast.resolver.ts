import { WeatherService }   from '../../../application/services/WeatherService';
import { CacheWeatherRepo } from '../../../infrastructure/repositories/CacheWeatherRepo';
import { Location }         from '../../../domain/models/Location';
import { GetForecastByCoordinatesArgs } from './dto/ForecastResolverTypes';
import { validateForecastByCoordinates } from './utils/validateForecastRequest';

const weatherRepository = new CacheWeatherRepo();
const weatherService = new WeatherService(weatherRepository);

export const forecastResolver = {
  Query: {
    getForecastByCoordinates: async (_: any, { latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
      validateForecastByCoordinates({ latitude, longitude, days });
      const location = new Location(latitude, longitude, days);

      return weatherService.getForecastForLocation(location);
    },
  },
};

