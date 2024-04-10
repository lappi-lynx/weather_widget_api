import { WeatherRepo }   from '../../domain/repositories/WeatherRepo';
import { Location }      from '../../domain/models/Location';
import { Forecast }      from '../../domain/models/Forecast';
import { DailyForecast } from '../../domain/models/DailyForecast';
import { ForecastMode }  from '../dto/ForecastMode';
import { CachingClientRepo } from '../repositories/CachingClientRepo';
import { MeteoServiceRepo }  from '../repositories/MeteoServiceRepo';

export class CachedWeatherManager implements WeatherRepo {
  private cachingClient: CachingClientRepo;
  private meteoService: MeteoServiceRepo;
  private ttl: number = 12 * 60 * 60; // 12h expiration

  constructor(cachingClient: CachingClientRepo, meteoService: MeteoServiceRepo) {
    this.cachingClient = cachingClient;
    this.meteoService = meteoService;
  }

  async getForecastForLocation(location: Location, mode: ForecastMode): Promise<Forecast[] | DailyForecast[]> {
    const cacheKey = `weather:${location.latitude}:${location.longitude}:forecast_mode:${mode}:forecast_days:${location.forecast_days}`;
    let cachedForecasts = await this.cachingClient.get(cacheKey);

    if (cachedForecasts) {
      console.log('*** Returning data from cache');
      return JSON.parse(cachedForecasts);
    }

    const forecasts = await this.meteoService.fetchForecast(location, mode);
    await this.cachingClient.setex(cacheKey, this.ttl, JSON.stringify(forecasts));
    return forecasts;
  }
}
