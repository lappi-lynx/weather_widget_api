import { WeatherRepo } from '../../domain/repositories/WeatherRepo';
import { Location } from '../../domain/models/Location';
import { Forecast } from '../../domain/models/Forecast';
import { DailyForecast } from '../../domain/models/DailyForecast';
import { MeteoService } from '../services/MeteoService';
import { ForecastMode } from '../../infrastructure/dto/ForecastMode';
import Redis from 'ioredis';

export class CacheWeatherRepo implements WeatherRepo {
  private redisClient: Redis;
  private meteoService: MeteoService;
  private ttl: number = 12 * 60 * 60; // 12h expiration

  constructor(redisClient: Redis = new Redis(), meteoService: MeteoService = new MeteoService()) {
    this.redisClient = redisClient;
    this.meteoService = meteoService;
  }

  async getForecast(location: Location, mode: ForecastMode): Promise < Forecast[] | DailyForecast[] > {
    const cacheKey = `weather:${location.latitude}:${location.longitude}:forecast_mode:${mode}:forecast_days:${location.forecast_days}`;
    let cachedForecasts = await this.redisClient.get(cacheKey);

    if (cachedForecasts) {
      console.log('*** Returning data from cache');
      return JSON.parse(cachedForecasts);
    }

    const forecasts = await this.meteoService.fetchForecast(location, mode);
    await this.redisClient.setex(cacheKey, this.ttl, JSON.stringify(forecasts));
    return forecasts;
  }
}
