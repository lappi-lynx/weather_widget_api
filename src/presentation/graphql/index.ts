import { readFileSync } from 'fs';
import { join } from 'path';
import { forecastResolver } from './resolvers/forecast.resolver';

const loadTypeDefs = (type: string) => {
  return readFileSync(join(__dirname, './typeDefs', `${type}.graphql`), 'utf-8');
};

export const typeDefs = [
  loadTypeDefs('location'),
  loadTypeDefs('forecast'),
  loadTypeDefs('query')
].join(' ');

export const resolvers = {
  Query: {
    ...forecastResolver.Query,
  }
};
