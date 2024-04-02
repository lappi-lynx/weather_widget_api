import { MeteoService } from '../../../../src/infrastructure/services/MeteoService';
import { Location }     from '../../../../src/domain/models/Location';
import { Forecast }     from '../../../../src/domain/models/Forecast';
import mockResponse     from '../../../fixtures/open-meteo-response-example.json';
import fetchMock        from 'jest-fetch-mock';

describe('MeteoService', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and parse forecasts correctly', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const meteoService = new MeteoService();
    const location = new Location(60.1695, 24.9354);
    const forecasts = await meteoService.fetchForecast(location);

    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('latitude=60.1695'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('longitude=24.9354'));
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('forecast_days=3'));
    expect(forecasts).toBeInstanceOf(Array);
    expect(forecasts).toHaveLength(mockResponse.hourly.time.length);
    expect(forecasts.length).toBeGreaterThan(0);

    if (forecasts.length > 0) {
      const firstForecast = forecasts[0];
      expect(firstForecast).toBeInstanceOf(Forecast);
      expect(firstForecast.location).toEqual(location);
      expect(firstForecast.timestamp).toEqual(mockResponse.hourly.time[0]);
      expect(firstForecast.temperature).toEqual(mockResponse.hourly.temperature_2m[0]);
      expect(firstForecast.humidity).toEqual(mockResponse.hourly.relative_humidity_2m[0]);
      expect(firstForecast.windSpeed).toEqual(mockResponse.hourly.wind_speed_10m[0]);
      expect(firstForecast.cloudCover).toEqual(mockResponse.hourly.cloud_cover[0]);
      expect(firstForecast.sunshineDuration).toEqual(mockResponse.hourly.sunshine_duration[0]);
      expect(firstForecast.precipitationProbability).toEqual(mockResponse.hourly.precipitation_probability[0]);
      expect(firstForecast.precipitation).toEqual(mockResponse.hourly.precipitation[0]);
      expect(firstForecast.temperatureUnit).toMatch(/^[CF]$/); // Ensures it's either 'C' or 'F'
    }
  });
});
