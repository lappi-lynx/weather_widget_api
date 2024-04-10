import { Location } from '../models/Location';
import { Forecast } from '../models/Forecast';
import { DailyForecast } from '../models/DailyForecast';
import { ForecastMode } from '../../infrastructure/dto/ForecastMode';

export type WeatherRepo = {
  getForecastForLocation: (location: Location, mode: ForecastMode) => Promise<Forecast[] | DailyForecast[]>;
}
