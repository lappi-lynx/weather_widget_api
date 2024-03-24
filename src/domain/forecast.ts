export class Forecast {
  constructor(
    public location: Location,
    public timestamp: string,
    public temperature: number,
    public humidity: number,
    public windSpeed: number,
    public temperatureUnit: string
  ) { }
}
