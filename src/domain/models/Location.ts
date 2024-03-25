export class Location {
  constructor(
    public latitude: number,
    public longitude: number,
    public forecast_days: number = 3
  ) {}
}
