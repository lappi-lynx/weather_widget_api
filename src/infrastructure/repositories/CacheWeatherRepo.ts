import { WeatherRepo } from '../../domain/repositories/WeatherRepo';
import { Location } from '../../domain/models/Location';
import { Forecast } from '../../domain/models/Forecast';
import { MeteoService } from '../services/MeteoService';
import Redis from 'ioredis';

export class CacheWeatherRepo implements WeatherRepo {
  private redisClient: Redis;
  private meteoService: MeteoService;
  private ttl: number = 24 * 60 * 60; // 24h expiration

  constructor() {
    this.redisClient  = new Redis();
    this.meteoService = new MeteoService();
  }

  async getForecast(location: Location): Promise<Forecast[]> {
    const cacheKey = `weather:${location.latitude}:${location.longitude}:forecast_days:${location.forecast_days}`;
    let cachedForecasts = await this.redisClient.get(cacheKey);

    if (cachedForecasts) {
      console.log('Returning data from cache');
      return JSON.parse(cachedForecasts);
    }

    const forecasts = await this.meteoService.fetchForecast(location);
    await this.redisClient.setex(cacheKey, this.ttl, JSON.stringify(forecasts));
    return forecasts;
  }
}
