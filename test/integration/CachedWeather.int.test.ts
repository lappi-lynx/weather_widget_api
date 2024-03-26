import { CacheWeatherRepo } from '../../src/infrastructure/repositories/CacheWeatherRepo';
import { Location } from '../../src/domain/models/Location';
import { Forecast } from '../../src/domain/models/Forecast';
import { MeteoService } from '../../src/infrastructure/services/MeteoService';
import mockResponse from './../fixtures/open-meteo-response-example.json';

const Redis = require('ioredis-mock')

describe('CacheWeatherRepo Integration Test with Redis and MeteoService Stubs', () => {
  let cacheWeatherRepo: CacheWeatherRepo;
  let redisMock: typeof Redis;
  const meteoServiceMock = new MeteoService();
  const location = new Location(60.17136, 24.927353);
  const cacheKey = `weather:${location.latitude}:${location.longitude}:forecast_days:${location.forecast_days}`;
  const temperatureUnit = 'C'
  const transformedData = mockResponse.hourly.time.map((timestamp: string, i: number) => {
    return new Forecast(
      location,
      timestamp,
      mockResponse.hourly.temperature_2m[i],
      mockResponse.hourly.relative_humidity_2m[i],
      mockResponse.hourly.wind_speed_10m[i],
      mockResponse.hourly.cloud_cover[i],
      temperatureUnit
    );
  });

  beforeEach(() => {
    redisMock = new Redis();
    jest.clearAllMocks();
    jest.spyOn(meteoServiceMock, 'fetchForecast').mockResolvedValue(transformedData);
    cacheWeatherRepo = new CacheWeatherRepo(redisMock, meteoServiceMock);
  });

  it('should retrieve forecast data from MeteoService and cache it', async () => {
    const forecasts = await cacheWeatherRepo.getForecast(location);

    expect(forecasts).toBeInstanceOf(Array);
    expect(forecasts).toHaveLength(transformedData.length);
    forecasts.forEach((forecast, index) => {
      expect(forecast).toBeInstanceOf(Forecast);
      expect(forecast.temperature).toBe(transformedData[index].temperature);
    });
    expect(meteoServiceMock.fetchForecast).toHaveBeenCalledWith(location);

    const cachedData = await redisMock.get(cacheKey);
    expect(cachedData).not.toBeNull();
    const cachedForecasts = JSON.parse(cachedData);
    expect(cachedForecasts).toHaveLength(forecasts.length);
  });

  it('should retrieve forecast data from cache on subsequent calls', async () => {
    await redisMock.set(cacheKey, JSON.stringify(transformedData));

    const cachedForecasts = await cacheWeatherRepo.getForecast(location);

    expect(cachedForecasts).not.toBeNull();
    expect(cachedForecasts).toHaveLength(transformedData.length);
    expect(meteoServiceMock.fetchForecast).not.toHaveBeenCalled();
  });
});
