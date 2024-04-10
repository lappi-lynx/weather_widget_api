import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import { WeatherService } from './application/services/WeatherService';
import { CacheWeatherRepo } from './infrastructure/repositories/CacheWeatherRepo';
import { Location } from './domain/models/Location';
import { typeDefs, resolvers } from './presentation/graphql/index';
import { validateQuerySchema } from './utils/validateQuerySchema';
import { handleErrors } from './utils/handleErrors';
import { ForecastMode } from './infrastructure/dto/ForecastMode';

dotenv.config();

const app = express();
const port = process.env.PORT || 4444;

async function runServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();

  app.use(cors());
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server));

  app.get('/weather', async (req, res) => {
    try {
      const { latitude, longitude, days, mode } = validateQuerySchema.parse({
        latitude: req.query.latitude,
        longitude: req.query.longitude,
        days: req.query.days,
        mode: req.query.mode || ForecastMode.Hourly
      });

      // NOTE: this is an implemntation details for REST API that should be decoupled from here to a separate service
      const location          = new Location(latitude, longitude, days);
      const weatherRepository = new CacheWeatherRepo();
      const weatherService    = new WeatherService(weatherRepository);
      const forecast          = await weatherService.getForecastForLocation(location, mode);

      res.json(forecast);
    } catch (e) {
      handleErrors(e, res);
    }
  });

  app.listen(port, () => {
    console.log(`Express Server is running on http://localhost:${port}`);
  });
}

runServer().catch((e) => {
  console.error('Failed to start the server:', e);
});
