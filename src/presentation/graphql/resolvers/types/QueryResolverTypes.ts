import { Forecast } from '../../../../domain/models/Forecast';
import { DailyForecast } from '../../../../domain/models/DailyForecast';

export type GetForecastByCoordinatesArgs = {
  latitude: number;
  longitude: number;
  days: number;
};

export type ForecastQueryResolvers = {
  getHourlyForecastByCoordinates: (_: any, args: GetForecastByCoordinatesArgs) => Promise<Forecast[] | DailyForecast[]>;
  getDailyForecastByCoordinates: (_: any, args: GetForecastByCoordinatesArgs) => Promise<Forecast[] | DailyForecast[]>;
};
