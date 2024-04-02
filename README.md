### GraphQL Apollo server (also supports REST API for dev needs)

It provides hourly meteorological data based on client requests.
Redis is used for caching duplicate requests with a 24-hour time to live (TTL).

I used a layered architecture to achieve the following qualities:
- The application is built around an independent object model.
- Inner layers define interfaces. Outer layers implement interfaces.
- The coupling direction is inward toward the center, adhering to dependency injection principles.
- Application core code is decoupled from infrastructure layer.

#### Installation:
```
docker build -t forecast_backend .
docker run --rm -p 4445:4445 forecast_backend
```
Server available by URL:
http://localhost:4445/graphql

#### Tests:
`npm test` locally or automatically with Github Actions on master push/pr.

#### Supported weather data:
`timestamp, temperature, humidity, windSpeed, cloudCover, sunshineDuration, precipitationProbability, precipitation`

#### Query example:
```
query {
  getForecastByCoordinates(latitude: 60.1695, longitude: 24.9354, days: 1) {
    location {
        latitude
        longitude
      }
      timestamp
      temperature
      humidity
      windSpeed
      cloudCover
      sunshineDuration
      precipitationProbability
      precipitation
      temperatureUnit
    }
}
```

#### Response example:
```
{
  "data": {
    "getForecastByCoordinates": [
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T00:00",
        "temperature": 5.8,
        "humidity": 88,
        "windSpeed": 20.5,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T01:00",
        "temperature": 5.9,
        "humidity": 85,
        "windSpeed": 20.9,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T02:00",
        "temperature": 5.5,
        "humidity": 85,
        "windSpeed": 22,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T03:00",
        "temperature": 5.2,
        "humidity": 87,
        "windSpeed": 22.7,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T04:00",
        "temperature": 4.6,
        "humidity": 88,
        "windSpeed": 23,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T05:00",
        "temperature": 4.3,
        "humidity": 86,
        "windSpeed": 23.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T06:00",
        "temperature": 4.1,
        "humidity": 85,
        "windSpeed": 23.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T07:00",
        "temperature": 4.1,
        "humidity": 84,
        "windSpeed": 22.3,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T08:00",
        "temperature": 4.3,
        "humidity": 82,
        "windSpeed": 24.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T09:00",
        "temperature": 4.4,
        "humidity": 81,
        "windSpeed": 25.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T10:00",
        "temperature": 4.4,
        "humidity": 81,
        "windSpeed": 23.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 5,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T11:00",
        "temperature": 4.7,
        "humidity": 82,
        "windSpeed": 28.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 11,
        "precipitation": 0.2,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T12:00",
        "temperature": 4.5,
        "humidity": 84,
        "windSpeed": 27,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 16,
        "precipitation": 0.4,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T13:00",
        "temperature": 4.2,
        "humidity": 86,
        "windSpeed": 28.1,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 42,
        "precipitation": 0.7,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T14:00",
        "temperature": 3.9,
        "humidity": 85,
        "windSpeed": 33.1,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 68,
        "precipitation": 0.6,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T15:00",
        "temperature": 3.7,
        "humidity": 86,
        "windSpeed": 34.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 94,
        "precipitation": 0.4,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T16:00",
        "temperature": 3.5,
        "humidity": 87,
        "windSpeed": 31,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 96,
        "precipitation": 1.6,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T17:00",
        "temperature": 2.9,
        "humidity": 88,
        "windSpeed": 34.2,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 98,
        "precipitation": 2.5,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T18:00",
        "temperature": 2.2,
        "humidity": 88,
        "windSpeed": 35.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 3.1,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T19:00",
        "temperature": 1.8,
        "humidity": 88,
        "windSpeed": 37.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 5,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T20:00",
        "temperature": 1.6,
        "humidity": 88,
        "windSpeed": 35.3,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 11.1,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T21:00",
        "temperature": 1.2,
        "humidity": 89,
        "windSpeed": 29.5,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 4.4,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T22:00",
        "temperature": 1.1,
        "humidity": 89,
        "windSpeed": 28.1,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 1.4,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-02T23:00",
        "temperature": 0.8,
        "humidity": 90,
        "windSpeed": 27.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 3.4,
        "temperatureUnit": "C"
      }
    ]
  }
}
```
Todos
- [X] use DDD and onion layered approach
- [X] Docker container
- [X] GraphQL + REST API endpoints with schema validations
- [X] Redis for caching duplicated queries response
- [X] Github Actions CI and test run
- [X] Unit and integration tests with JEST
