import { WeatherServiceRepo } from './../../application/repositories/WeatherServiceRepo';
import { WeatherRepo } from './../../domain/repositories/WeatherRepo';
import { Location } from './../../domain/models/Location';
import { Forecast } from './../../domain/models/Forecast';
import { DailyForecast } from './../../domain/models/DailyForecast';
import { ForecastMode } from './../../infrastructure/dto/ForecastMode';

export class WeatherService implements WeatherServiceRepo {
  private weatherRepository: WeatherRepo;

  constructor(weatherRepository: WeatherRepo) {
    this.weatherRepository = weatherRepository;
  }

  async getForecastForLocation(location: Location, modeStr: string = ForecastMode.Hourly): Promise<Forecast[] | DailyForecast[]> {
    const mode: ForecastMode = this.convertToForecastMode(modeStr);
    return this.weatherRepository.getForecast(location, mode);
  }

  private convertToForecastMode(modeStr: string): ForecastMode {
    switch (modeStr) {
      case 'hourly':
        return ForecastMode.Hourly;
      case 'daily':
        return ForecastMode.Daily;
      default:
        throw new Error(`Invalid mode: ${modeStr}`);
    }
  }
}
