import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import { z } from 'zod';
import { WeatherService } from './application/services/WeatherService';
import { CacheWeatherRepo } from './infrastructure/repositories/CacheWeatherRepo';
import { Location } from './domain/models/Location';
import { typeDefs, resolvers } from './presentation/graphql/index';
import { MIN_FORECAST_DAYS, MAX_FORECAST_DAYS, MIN_LATITUDE, MAX_LATITUDE, MIN_LONGITUDE, MAX_LONGITUDE } from './constants';

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;

async function runServer() {
  const weatherRepository = new CacheWeatherRepo();
  const weatherService = new WeatherService(weatherRepository);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  const querySchema = z.object({
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
      message: `days must be a number between ${MIN_FORECAST_DAYS} and ${MAX_FORECAST_DAYS}.`,
    })
  });

  app.get('/weather', async (req, res) => {
    try {
      const { latitude, longitude, days } = querySchema.parse({
        latitude: req.query.latitude,
        longitude: req.query.longitude,
        days: req.query.days as string
      });

      const location = new Location(latitude, longitude, days);
      const forecast = await weatherService.getForecastForLocation(location);

      res.json(forecast);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid query parameters.", errors: e.errors });
      } else if (e instanceof Error) {
        console.error('Error fetching weather data:', e);
        return res.status(500).json({ message: e.message });
      }
    }
  });

  app.listen(port, () => {
    console.log(`Express Server is running on http://localhost:${port}`);
  });
}

runServer().catch((e) => {
  console.error('Failed to start the server:', e);
});
