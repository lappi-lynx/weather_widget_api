import { Location } from '../../domain/models/Location';
import { Forecast } from '../../domain/models/Forecast';
import { DailyForecast } from '../../domain/models/DailyForecast';

export type WeatherServiceRepo = {
  getForecastForLocation: (location: Location, modeStr: string) => Promise<Forecast[] | DailyForecast[]>;
}
