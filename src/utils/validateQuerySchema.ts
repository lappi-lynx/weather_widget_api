import { z } from 'zod';
import { MIN_FORECAST_DAYS, MAX_FORECAST_DAYS, MIN_LATITUDE, MAX_LATITUDE, MIN_LONGITUDE, MAX_LONGITUDE } from '../constants';
import { ForecastMode } from '../infrastructure/dto/ForecastMode';

export const validateQuerySchema = z.object({
  latitude: z.string()
    .transform((str) => parseFloat(str))
    .refine((val) => !isNaN(val) && val >= MIN_LATITUDE && val <= MAX_LATITUDE, {
      message: `Latitude must be a number between ${MIN_LATITUDE} and ${MAX_LATITUDE}.`,
    }),
  longitude: z.string()
    .transform((str) => parseFloat(str))
    .refine((val) => !isNaN(val) && val >= MIN_LONGITUDE && val <= MAX_LONGITUDE, {
      message: `Longitude must be a number between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}.`,
    }),
  days: z.string()
    .transform((str) => parseInt(str, 10))
    .refine((n) => !isNaN(n) && n >= MIN_FORECAST_DAYS && n <= MAX_FORECAST_DAYS, {
      message: `Days must be a number between ${MIN_FORECAST_DAYS} and ${MAX_FORECAST_DAYS}.`,
    }),
  mode: z.string()
    .refine((mode) => mode === undefined || Object.values(ForecastMode).includes(mode as ForecastMode), {
      message: `Mode must be either '${ForecastMode.Hourly}' or '${ForecastMode.Daily}'.`,
    }),
});
