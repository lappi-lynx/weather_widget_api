import { CachedWeatherManager } from '../../src/infrastructure/services/CachedWeatherManager';
import { Location } from '../../src/domain/models/Location';
import { Forecast } from '../../src/domain/models/Forecast';
import { DailyForecast } from '../../src/domain/models/DailyForecast';
import { MeteoService } from '../../src/infrastructure/services/MeteoService';
import { ForecastMode } from '../../src/infrastructure/dto/ForecastMode';
import mockHourlyResponse from './../fixtures/open-meteo-response-example.json';
import mockDailyResponse from './../fixtures/open-meteo-daily-response-example.json';
import { TEMPERATURE_UNIT } from './../../src/constants';

const Redis = require('ioredis-mock');

describe('CachedWeatherManager Integration test with Redis and MeteoService Stubs', () => {
  let cacheWeatherService: CachedWeatherManager;
  let redisMock: typeof Redis;
  const meteoServiceMock = new MeteoService();
  const location = new Location(60.17136, 24.927353);
  const mode = ForecastMode.Hourly; // Set this to ForecastMode.Daily to test daily forecasts
  const cacheKey = `weather:${location.latitude}:${location.longitude}:forecast_mode:${mode}:forecast_days:${location.forecast_days}`;

  let transformedData: Forecast[] | DailyForecast[];

  beforeEach(() => {
    redisMock = new Redis();
    jest.clearAllMocks();

    transformedData = mode === ForecastMode.Hourly ?
      mockHourlyResponse.hourly.time.map((timestamp: string, i: number) => {
        return new Forecast(
          location,
          timestamp,
          mockHourlyResponse.hourly.temperature_2m[i],
          mockHourlyResponse.hourly.relative_humidity_2m[i],
          mockHourlyResponse.hourly.wind_speed_10m[i],
          mockHourlyResponse.hourly.cloud_cover[i],
          mockHourlyResponse.hourly.sunshine_duration[i],
          mockHourlyResponse.hourly.precipitation_probability[i],
          mockHourlyResponse.hourly.precipitation[i],
          TEMPERATURE_UNIT
        );
      }) :
      mockDailyResponse.daily.time.map((timestamp: string, i: number) => {
        return new DailyForecast(
          location,
          timestamp,
          mockDailyResponse.daily.temperature_2m_max[i],
          mockDailyResponse.daily.temperature_2m_min[i],
          mockDailyResponse.daily.weather_code[i],
          mockDailyResponse.daily.wind_speed_10m_max[i],
          mockDailyResponse.daily.sunshine_duration[i] ?? 0,
          mockDailyResponse.daily.precipitation_probability_mean[i] ?? 0,
          mockDailyResponse.daily.precipitation_sum[i],
          TEMPERATURE_UNIT
        );
      });

    jest.spyOn(meteoServiceMock, 'fetchForecast').mockResolvedValue(transformedData);
    cacheWeatherService = new CachedWeatherManager(redisMock, meteoServiceMock);
  });

  it('should retrieve forecast data from MeteoService and cache it', async () => {
    const forecasts = await cacheWeatherService.getForecastForLocation(location, mode);

    expect(forecasts).toBeInstanceOf(Array);
    expect(forecasts).toHaveLength(transformedData.length);
    forecasts.forEach((forecast, index) => {
      if (mode === ForecastMode.Hourly) {
        expect(forecast).toBeInstanceOf(Forecast);
      } else {
        expect(forecast).toBeInstanceOf(DailyForecast);
      }
    });
    expect(meteoServiceMock.fetchForecast).toHaveBeenCalledWith(location, mode);

    const cachedData = await redisMock.get(cacheKey);
    expect(cachedData).not.toBeNull();
    const cachedForecasts = JSON.parse(cachedData);
    expect(cachedForecasts).toHaveLength(forecasts.length);
  });

  it('should retrieve forecast data from cache on subsequent calls', async () => {
    await redisMock.set(cacheKey, JSON.stringify(transformedData));

    const cachedForecasts = await cacheWeatherService.getForecastForLocation(location, mode);

    expect(cachedForecasts).not.toBeNull();
    expect(cachedForecasts).toHaveLength(transformedData.length);
    expect(meteoServiceMock.fetchForecast).not.toHaveBeenCalled();
  });
});
