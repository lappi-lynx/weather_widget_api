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
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    wind_speed_10m_max: number[];
    weather_code: number[];
    precipitation_probability_mean: number[] | null[];
    sunshine_duration: number[] | null[];
  };
  daily_units?: {
    temperature_2m_max: string;
  };
};
