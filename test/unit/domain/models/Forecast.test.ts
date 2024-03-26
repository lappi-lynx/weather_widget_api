import { Forecast } from '../../../../src/domain/models/Forecast';
import { Location } from '../../../../src/domain/models/Location';

describe('Forecast', () => {
  it('should create an instance with the correct properties', () => {
    const location        = new Location(52.52, 13.405);
    const timestamp       = '2024-03-26T12:00';
    const temperature     = 20;
    const humidity        = 50;
    const windSpeed       = 10;
    const cloudCover      = 80;
    const temperatureUnit = 'C';

    const forecast = new Forecast(
      location,
      timestamp,
      temperature,
      humidity,
      windSpeed,
      cloudCover,
      temperatureUnit
    );

    expect(forecast).toBeInstanceOf(Forecast);
    expect(forecast.location).toEqual(location);
    expect(forecast.timestamp).toEqual(timestamp);
    expect(forecast.temperature).toEqual(temperature);
    expect(forecast.humidity).toEqual(humidity);
    expect(forecast.windSpeed).toEqual(windSpeed);
    expect(forecast.cloudCover).toEqual(cloudCover);
    expect(forecast.temperatureUnit).toEqual(temperatureUnit);
  });
});
