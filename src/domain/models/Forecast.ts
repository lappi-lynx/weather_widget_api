import { Location } from './Location';

export class Forecast {
  constructor(
    public location: Location,
    public timestamp: string,
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
    public cloudCover: number,
    public sunshineDuration: number,
    public temperatureUnit: string
  ) { }
}
