export const typeDefs = `
  type Location {
    latitude: Float!
    longitude: Float!
    forecast_days: Int
  }

  type Forecast {
    location: Location!
    timestamp: String!
    temperature: Float!
    humidity: Int!
    windSpeed: Float!
    cloudCover: Int!
    sunshineDuration: Int!
    temperatureUnit: String!
  }

  type Query {
    getForecastForLocation(latitude: Float!, longitude: Float!, forecast_days: Int): [Forecast]
  }
`;
