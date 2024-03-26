import { Location } from '../models/Location';
import { Forecast } from '../models/Forecast';

export type WeatherRepo = {
  getForecast: (location: Location) => Promise<Forecast[]>;
}
