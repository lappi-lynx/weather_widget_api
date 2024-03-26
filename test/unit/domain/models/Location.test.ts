import { Location } from '../../../../src/domain/models/Location';

describe('Location', () => {
  it('create an instance with the correct latitude, longitude, and default forecast_days', () => {
    const latitude              = 52.52;
    const longitude             = 13.405;
    const default_forecast_days = 3;

    const location = new Location(latitude, longitude);

    expect(location).toBeInstanceOf(Location);
    expect(location.latitude).toEqual(latitude);
    expect(location.longitude).toEqual(longitude);
    expect(location.forecast_days).toEqual(default_forecast_days);
  });

  it('should create an instance with the correct latitude, longitude, and specified forecast_days', () => {
    const latitude      = 34.0522;
    const longitude     = -118.2437;
    const forecast_days = 5;

    const location = new Location(latitude, longitude, forecast_days);

    expect(location).toBeInstanceOf(Location);
    expect(location.latitude).toEqual(latitude);
    expect(location.longitude).toEqual(longitude);
    expect(location.forecast_days).toEqual(forecast_days);
  });
});
