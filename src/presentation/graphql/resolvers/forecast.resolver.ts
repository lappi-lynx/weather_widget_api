import { WeatherServiceRepo } from '../../../application/repositories/WeatherServiceRepo';
import { Location }         from '../../../domain/models/Location';
import { GetForecastByCoordinatesArgs } from './types/QueryResolverTypes';
import { validateForecastByCoordinates } from './utils/validateForecastRequest';
import { ForecastMode } from '../../../infrastructure/dto/ForecastMode';

export const forecastResolver = (weatherService: WeatherServiceRepo) => ({
  Query: {
    getHourlyForecastByCoordinates: async (_: any, { latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
      validateForecastByCoordinates({ latitude, longitude, days });
      const location = new Location(latitude, longitude, days);
      return weatherService.getForecastForLocation(location, ForecastMode.Hourly);
    },
    getDailyForecastByCoordinates: async (_: any, { latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
      validateForecastByCoordinates({ latitude, longitude, days });
      const location = new Location(latitude, longitude, days);
      return weatherService.getForecastForLocation(location, ForecastMode.Daily);
    },
  }
});
