import { WeatherService } from '../../../application/services/WeatherService';
import { CacheWeatherRepo } from '../../../infrastructure/repositories/CacheWeatherRepo';
import { Location } from '../../../domain/models/Location';

const weatherRepository = new CacheWeatherRepo();
const weatherService = new WeatherService(weatherRepository);

export const resolvers = {
  Query: {
    getForecastForLocation: async (_: any, { latitude, longitude, forecast_days }: { latitude: number; longitude: number; forecast_days?: number }) => {
      if (forecast_days !== undefined && (forecast_days < 1 || forecast_days > 16)) {
        throw new Error("forecast_days must be a number between 1 and 16.");
      }
      const location = new Location(latitude, longitude, forecast_days);

      return weatherService.getForecastForLocation(location);
    },
  },
};

