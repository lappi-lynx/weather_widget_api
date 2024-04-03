import { DailyForecast } from '../../../../src/domain/models/DailyForecast';
import { Location } from '../../../../src/domain/models/Location';

describe('DailyForecast', () => {
  it('should create an instance with the correct properties', () => {
    const location = new Location(52.52, 13.405);
    const timestamp = '2024-03-26';
    const temperatureMax = 25;
    const temperatureMin = 15;
    const weatherCode = 100;
    const windSpeed = 5;
    const sunshineDuration = 50000;
    const precipitationProbability = 10;
    const precipitation = 5;
    const temperatureUnit = 'C';

    const dailyForecast = new DailyForecast(
      location,
      timestamp,
      temperatureMax,
      temperatureMin,
      weatherCode,
      windSpeed,
      sunshineDuration,
      precipitationProbability,
      precipitation,
      temperatureUnit
    );

    expect(dailyForecast).toBeInstanceOf(DailyForecast);
    expect(dailyForecast.location).toEqual(location);
    expect(dailyForecast.timestamp).toEqual(timestamp);
    expect(dailyForecast.temperatureMax).toEqual(temperatureMax);
    expect(dailyForecast.temperatureMin).toEqual(temperatureMin);
    expect(dailyForecast.weatherCode).toEqual(weatherCode);
    expect(dailyForecast.windSpeed).toEqual(windSpeed);
    expect(dailyForecast.sunshineDuration).toEqual(sunshineDuration);
    expect(dailyForecast.precipitationProbability).toEqual(precipitationProbability);
    expect(dailyForecast.precipitation).toEqual(precipitation);
    expect(dailyForecast.temperatureUnit).toEqual(temperatureUnit);
  });

  it('should set precipitationProbability to 0 when null is provided', () => {
    const location = new Location(52.52, 13.405);
    const timestamp = '2024-03-26';
    const temperatureMax = 25;
    const temperatureMin = 15;
    const weatherCode = 100;
    const windSpeed = 5;
    const sunshineDuration = 50000;
    const precipitationProbability = null;
    const precipitation = 5;
    const temperatureUnit = 'C';

    const dailyForecast = new DailyForecast(
      location,
      timestamp,
      temperatureMax,
      temperatureMin,
      weatherCode,
      windSpeed,
      sunshineDuration,
      precipitationProbability,
      precipitation,
      temperatureUnit
    );

    expect(dailyForecast).toBeInstanceOf(DailyForecast);
    expect(dailyForecast.precipitationProbability).toEqual(0);
    expect(dailyForecast.location).toEqual(location);
    expect(dailyForecast.timestamp).toEqual(timestamp);
    expect(dailyForecast.temperatureMax).toEqual(temperatureMax);
    expect(dailyForecast.temperatureMin).toEqual(temperatureMin);
    expect(dailyForecast.weatherCode).toEqual(weatherCode);
    expect(dailyForecast.windSpeed).toEqual(windSpeed);
    expect(dailyForecast.sunshineDuration).toEqual(sunshineDuration);
    expect(dailyForecast.precipitation).toEqual(precipitation);
    expect(dailyForecast.temperatureUnit).toEqual(temperatureUnit);
  });
});
