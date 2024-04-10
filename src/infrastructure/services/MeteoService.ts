import { Location } from './../../domain/models/Location';
import { Forecast } from '../../domain/models/Forecast';
import { DailyForecast } from '../../domain/models/DailyForecast';
import { MeteoResponse } from './../dto/MeteoResponse';
import { ForecastMode } from './../dto/ForecastMode';
import { METEO_PROVIDER_BASE_URL, TEMPERATURE_UNIT, TEMPERATURE_CODE } from './../../constants';

export class MeteoService {
  async fetchForecast(location: Location, mode: ForecastMode): Promise<Forecast[] | DailyForecast[]> {
    const params = new URLSearchParams({
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
      temperature_unit: TEMPERATURE_UNIT,
      forecast_days: (location.forecast_days || 3).toString()
    });

    if (mode === ForecastMode.Hourly) {
      params.set('hourly', 'temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover,sunshine_duration,precipitation_probability,precipitation');
    } else if (mode === ForecastMode.Daily) {
      params.set('daily', 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,weather_code,precipitation_probability_mean,sunshine_duration');
    }

    const response = await fetch(`${METEO_PROVIDER_BASE_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data: MeteoResponse = await response.json();

    if (mode === ForecastMode.Hourly) {
      const hourly_data = data.hourly;

      return hourly_data.time.map((timestamp: string, i: number) => new Forecast(
        location,
        timestamp,
        hourly_data.temperature_2m[i],
        hourly_data.relative_humidity_2m[i],
        hourly_data.wind_speed_10m[i],
        hourly_data.cloud_cover[i],
        hourly_data.sunshine_duration[i],
        hourly_data.precipitation_probability[i],
        hourly_data.precipitation[i],
        TEMPERATURE_CODE
      ));
    } else {
      const daily_data = data.daily;

      if (!daily_data) {
        throw new Error('Daily forecast data is missing in the response');
      }

      return daily_data.time.map((timestamp: string, i: number) => new DailyForecast(
        location,
        timestamp,
        daily_data.temperature_2m_max[i],
        daily_data.temperature_2m_min[i],
        daily_data.weather_code[i],
        daily_data.wind_speed_10m_max[i],
        daily_data.sunshine_duration[i] ?? 0,
        daily_data.precipitation_probability_mean[i] ?? 0,
        daily_data.precipitation_sum[i],
        TEMPERATURE_CODE
      ));
    }
  }
}
