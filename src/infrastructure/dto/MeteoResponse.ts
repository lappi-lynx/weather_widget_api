export type MeteoResponse = {
  hourly: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    cloud_cover: number[];
    sunshine_duration: number[];
    precipitation_probability: number[];
    precipitation: number[];
  };
  hourly_units: {
    temperature_2m: string;
  };
};
