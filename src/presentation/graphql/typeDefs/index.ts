import { readFileSync } from 'fs';
import { join } from 'path';

const loadTypeDefs = (type: string) => {
  return readFileSync(join(__dirname, `${type}.graphql`), 'utf-8');
};

export const typeDefs = [
  loadTypeDefs('Location'),
  loadTypeDefs('Forecast'),
  loadTypeDefs('Query')
].join(' ');
