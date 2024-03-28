import { WeatherService }   from '../../../application/services/WeatherService';
import { CacheWeatherRepo } from '../../../infrastructure/repositories/CacheWeatherRepo';
import { Location }         from '../../../domain/models/Location';
import { GetForecastByCoordinatesArgs } from './dto/ForecastResolverTypes';
import { MIN_FORECAST_DAYS, MAX_FORECAST_DAYS } from '../../../constants';


const weatherRepository = new CacheWeatherRepo();
const weatherService = new WeatherService(weatherRepository);

export const forecastResolver = {
  Query: {
    getForecastByCoordinates: async (_: any, { latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
      if (days !== undefined && (days < MIN_FORECAST_DAYS || days > MAX_FORECAST_DAYS)) {
        throw new Error(`days must be a number between ${MIN_FORECAST_DAYS} and ${MAX_FORECAST_DAYS}.`);
      }
      const location = new Location(latitude, longitude, days);

      return weatherService.getForecastForLocation(location);
    },
  },
};

