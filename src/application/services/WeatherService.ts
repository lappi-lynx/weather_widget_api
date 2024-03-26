import { WeatherRepo } from './../../domain/repositories/WeatherRepo';
import { Location } from './../../domain/models/Location';
import { Forecast } from './../../domain/models/Forecast';

export class WeatherService {
  private weatherRepository: WeatherRepo;

  constructor(weatherRepository: WeatherRepo) {
    this.weatherRepository = weatherRepository;
  }

  async getForecastForLocation(location: Location): Promise<Forecast[]> {
    return this.weatherRepository.getForecast(location);
  }
}
