import { MeteoService } from '../../../../src/infrastructure/services/MeteoService';
import { Location } from '../../../../src/domain/models/Location';
import { Forecast } from '../../../../src/domain/models/Forecast';
import { DailyForecast } from '../../../../src/domain/models/DailyForecast';
import { ForecastMode } from '../../../../src/infrastructure/dto/ForecastMode';
import mockHourlyResponse from '../../../fixtures/open-meteo-response-example.json';
import mockDailyResponse from '../../../fixtures/open-meteo-daily-response-example.json';
import fetchMock from 'jest-fetch-mock';

describe('MeteoService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and parse hourly forecasts correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockHourlyResponse));

    const meteoService = new MeteoService();
    const location = new Location(60.1695, 24.9354);
    const forecasts = await meteoService.fetchForecast(location, ForecastMode.Hourly);

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('latitude=60.1695'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('longitude=24.9354'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('hourly='));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('forecast_days=3'));

    expect(forecasts).toBeInstanceOf(Array);
    expect(forecasts).toHaveLength(mockHourlyResponse.hourly.time.length);
    expect(forecasts[0]).toBeInstanceOf(Forecast);
  });

  it('should fetch and parse daily forecasts correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockDailyResponse));

    const meteoService = new MeteoService();
    const location = new Location(60.1695, 24.9354);
    const forecasts = await meteoService.fetchForecast(location, ForecastMode.Daily);

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('latitude=60.1695'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('longitude=24.9354'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('daily='));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('forecast_days=3'));

    expect(forecasts).toBeInstanceOf(Array);
    expect(forecasts).toHaveLength(mockDailyResponse.daily.time.length);
    expect(forecasts[0]).toBeInstanceOf(DailyForecast);
  });
});
