import { Forecast } from '../../../../domain/models/Forecast';

export type GetForecastByCoordinatesArgs = {
  latitude: number;
  longitude: number;
  days?: number;
};

export type ForecastQueryResolvers = {
  getForecastByCoordinates: (_: any, args: GetForecastByCoordinatesArgs) => Promise<Forecast>;
};
