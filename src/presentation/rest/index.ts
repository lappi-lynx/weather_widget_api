import { WeatherService } from './../../application/services/WeatherService';
import { CachedWeatherManager } from '../../infrastructure/services/CachedWeatherManager';
import { Location } from './../../domain/models/Location';
import { MeteoService } from './../../infrastructure/services/MeteoService';
import Redis from 'ioredis';

// NOTE: getWeatherForLocation name used to avoid collision graphql getForecastForLocation in demo purposes
export const getWeatherForLocation = async (latitude: number, longitude: number, days: number, mode: string) => {
  const redisClient          = new Redis();
  const meteoServiceInstance = new MeteoService();
  const location             = new Location(latitude, longitude, days);
  const cachedWeather        = new CachedWeatherManager(redisClient, meteoServiceInstance);
  const weatherService       = new WeatherService(cachedWeather);

  return await weatherService.getForecastForLocation(location, mode);
}
