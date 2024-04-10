import { Location } from '../../domain/models/Location';
import { ForecastMode } from '../../infrastructure/dto/ForecastMode';
import { Forecast } from '../../domain/models/Forecast';
import { DailyForecast } from '../../domain/models/DailyForecast';

export type MeteoServiceRepo = {
  fetchForecast(location: Location, mode: ForecastMode): Promise<Forecast[] | DailyForecast[]>;
}
