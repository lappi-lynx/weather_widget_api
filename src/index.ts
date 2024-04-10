import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import dotenv from 'dotenv';
import { typeDefs, resolvers } from './presentation/graphql/index';
import { validateQuerySchema } from './utils/validateQuerySchema';
import { handleErrors } from './utils/handleErrors';
import { ForecastMode } from './infrastructure/dto/ForecastMode';
import { getWeatherForLocation } from './presentation/rest/index';

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

      const forecast = await getWeatherForLocation(latitude, longitude, days, mode);

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
