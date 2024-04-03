import { Location } from './Location';

// TODO: Implement composition to avoid duplications with Forecast class
export class DailyForecast {
  public precipitationProbability: number;

  constructor(
    public location: Location,
    public timestamp: string,
    public temperatureMax: number,
    public temperatureMin: number,
    public weatherCode: number,
    public windSpeed: number,
    public sunshineDuration: number,
    precipitationProbability: number | null,
    public precipitation: number,
    public temperatureUnit: string
  ) {
    this.precipitationProbability = precipitationProbability === null ? 0 : precipitationProbability;
  }
}
