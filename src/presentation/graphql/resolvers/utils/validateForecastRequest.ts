import { GetForecastByCoordinatesArgs } from '../dto/ForecastResolverTypes';
import {
  MIN_FORECAST_DAYS,
  MAX_FORECAST_DAYS,
  MIN_LATITUDE,
  MAX_LATITUDE,
  MIN_LONGITUDE,
  MAX_LONGITUDE,
} from '../../../../constants';

export const validateForecastByCoordinates = ({ latitude, longitude, days }: GetForecastByCoordinatesArgs) => {
  if (typeof latitude !== 'number' || isNaN(latitude) || latitude < MIN_LATITUDE || latitude > MAX_LATITUDE) {
    throw new Error(`Latitude must be a number between ${MIN_LATITUDE} and ${MAX_LATITUDE}.`);
  }

  if (typeof longitude !== 'number' || isNaN(longitude) || longitude < MIN_LONGITUDE || longitude > MAX_LONGITUDE) {
    throw new Error(`Longitude must be a number between ${MIN_LONGITUDE} and ${MAX_LONGITUDE}.`);
  }

  if (days !== undefined && (days < MIN_FORECAST_DAYS || days > MAX_FORECAST_DAYS)) {
    throw new Error(`Days must be a number between ${MIN_FORECAST_DAYS} and ${MAX_FORECAST_DAYS}.`);
  }
};
