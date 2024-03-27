import { Location } from './../../domain/models/Location';
import { Forecast } from './../../domain/models/Forecast';

const METEO_PROVIDER_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export class MeteoService {
  async fetchForecast(location: Location): Promise<Forecast[]> {
    let forecast_days = location.forecast_days || 3;
    let params = `latitude=${location.latitude}&longitude=${location.longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover,sunshine_duration&temperature_unit=celsius&forecast_days=${forecast_days}`;
    const response = await fetch(`${METEO_PROVIDER_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();
    const temperatureUnit = data.hourly_units.temperature_2m.replace(/[^CF]/g, '');
    const hourly_data = data.hourly

    return data.hourly.time.map((timestamp: string, i: number) => new Forecast(
      location,
      timestamp,
      hourly_data.temperature_2m[i],
      hourly_data.relative_humidity_2m[i],
      hourly_data.wind_speed_10m[i],
      hourly_data.cloud_cover[i],
      hourly_data.sunshine_duration[i],
      temperatureUnit
    ));
  }
}
