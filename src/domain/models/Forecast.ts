import { Location } from './Location';

export class Forecast {
public precipitationProbability: number;

  constructor(
    public location: Location,
    public timestamp: string,
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
    public cloudCover: number,
    public sunshineDuration: number,
    precipitationProbability: number | null,
    public precipitation: number,
    public temperatureUnit: string
  ) {
    this.precipitationProbability = precipitationProbability === null ? 0 : precipitationProbability;
  }
}
