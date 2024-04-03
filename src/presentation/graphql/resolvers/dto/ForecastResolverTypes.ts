import { Forecast } from '../../../../domain/models/Forecast';
import { DailyForecast } from '../../../../domain/models/DailyForecast';
import { ForecastMode } from '../../../../infrastructure/dto/ForecastMode';

export type GetForecastByCoordinatesArgs = {
  latitude: number;
  longitude: number;
  days?: number;
  mode?: ForecastMode;
};

export type ForecastQueryResolvers = {
  getForecastByCoordinates: (_: any, args: GetForecastByCoordinatesArgs) => Promise<Forecast[] | DailyForecast[]>;
};
