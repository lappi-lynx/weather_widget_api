### GraphQL Apollo server (also supports REST API)

It provides 2 types of meteorological data based on client requests - `daily` and `hourly` weather info.
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

REST API:
http://localhost:4445/weather?latitude=61.1695&longitude=34.9354&days=10&mode=daily

#### Tests:
`npm test` locally or automatically with Github Actions on master push/pr.

#### Supported weather data:
`timestamp, temperature, humidity, windSpeed, cloudCover, sunshineDuration, precipitationProbability, precipitation`

#### Queries examples:
`days` param is optional, set to `3` by default.
```
query {
  getHourlyForecastByCoordinates(latitude: 60.1695, longitude: 24.9354, days: 1) {
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

query {
  getDailyForecastByCoordinates(latitude: 60.1695, longitude: 24.9354, days: 1) {
    location {
      latitude
      longitude
    }
    timestamp
      temperatureMax
      temperatureMin
      weatherCode
      windSpeed
      sunshineDuration
      precipitationProbability
      precipitation
      temperatureUnit
  }
}
```

Todos
- [X] use DDD and onion layered approach
- [X] Docker container
- [X] GraphQL + REST API endpoints
- [X] `daily` and `hourly` forecast modes supported
- [X] Requests schema validations
- [X] Redis for caching duplicated queries response
- [X] Github Actions CI and test run
- [X] Unit and integration tests with JEST


#### Response example:
##### Daily data:
```
{
  "data": {
    "getDailyForecastByCoordinates": [
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03",
        "temperatureMax": 1.1,
        "temperatureMin": -2.9,
        "weatherCode": 73,
        "windSpeed": 33.5,
        "sunshineDuration": 12684.88,
        "precipitationProbability": 38,
        "precipitation": 3.2,
        "temperatureUnit": "C"
      }
    ]
  }
}
```

##### Hourly data:

```
{
  "data": {
    "getHourlyForecastByCoordinates": [
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T00:00",
        "temperature": 0,
        "humidity": 88,
        "windSpeed": 27.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 100,
        "precipitation": 0.7,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T01:00",
        "temperature": -0.4,
        "humidity": 86,
        "windSpeed": 26.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 89,
        "precipitation": 0.4,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T02:00",
        "temperature": -0.7,
        "humidity": 85,
        "windSpeed": 28.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 79,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T03:00",
        "temperature": -1,
        "humidity": 86,
        "windSpeed": 28.4,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 68,
        "precipitation": 0.1,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T04:00",
        "temperature": -1.3,
        "humidity": 84,
        "windSpeed": 28.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 78,
        "precipitation": 0.7,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T05:00",
        "temperature": -1.7,
        "humidity": 82,
        "windSpeed": 30.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 87,
        "precipitation": 0.3,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T06:00",
        "temperature": -1.8,
        "humidity": 82,
        "windSpeed": 27,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 97,
        "precipitation": 0.2,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T07:00",
        "temperature": -1.7,
        "humidity": 82,
        "windSpeed": 26.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 83,
        "precipitation": 0.5,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T08:00",
        "temperature": -1.3,
        "humidity": 79,
        "windSpeed": 28.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 69,
        "precipitation": 0.3,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T09:00",
        "temperature": -0.9,
        "humidity": 74,
        "windSpeed": 31,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 55,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T10:00",
        "temperature": -0.6,
        "humidity": 72,
        "windSpeed": 33.1,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 42,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T11:00",
        "temperature": 0.1,
        "humidity": 71,
        "windSpeed": 33.5,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "precipitationProbability": 29,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T12:00",
        "temperature": 0.4,
        "humidity": 67,
        "windSpeed": 30.6,
        "cloudCover": 100,
        "sunshineDuration": 383.78,
        "precipitationProbability": 16,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T13:00",
        "temperature": 0.9,
        "humidity": 66,
        "windSpeed": 29.5,
        "cloudCover": 98,
        "sunshineDuration": 2378.84,
        "precipitationProbability": 12,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T14:00",
        "temperature": 1.1,
        "humidity": 65,
        "windSpeed": 29.2,
        "cloudCover": 94,
        "sunshineDuration": 3600,
        "precipitationProbability": 7,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T15:00",
        "temperature": 1,
        "humidity": 65,
        "windSpeed": 27.7,
        "cloudCover": 95,
        "sunshineDuration": 3600,
        "precipitationProbability": 3,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T16:00",
        "temperature": 0.5,
        "humidity": 64,
        "windSpeed": 26.3,
        "cloudCover": 94,
        "sunshineDuration": 2722.26,
        "precipitationProbability": 2,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T17:00",
        "temperature": -0.1,
        "humidity": 64,
        "windSpeed": 27,
        "cloudCover": 91,
        "sunshineDuration": 0,
        "precipitationProbability": 1,
        "precipitation": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-04-03T18:00",
        "temperature": -0.6,
        "humidity": 64,
        "windSpeed": 26.6,
        "cloudCover": 93,
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
        "timestamp": "2024-04-03T19:00",
        "temperature": -1,
        "humidity": 65,
        "windSpeed": 26.3,
        "cloudCover": 94,
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
        "timestamp": "2024-04-03T20:00",
        "temperature": -1.5,
        "humidity": 66,
        "windSpeed": 25.6,
        "cloudCover": 93,
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
        "timestamp": "2024-04-03T21:00",
        "temperature": -1.9,
        "humidity": 65,
        "windSpeed": 26.6,
        "cloudCover": 86,
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
        "timestamp": "2024-04-03T22:00",
        "temperature": -2.4,
        "humidity": 66,
        "windSpeed": 25.6,
        "cloudCover": 92,
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
        "timestamp": "2024-04-03T23:00",
        "temperature": -2.9,
        "humidity": 65,
        "windSpeed": 23.4,
        "cloudCover": 48,
        "sunshineDuration": 0,
        "precipitationProbability": 0,
        "precipitation": 0,
        "temperatureUnit": "C"
      }
    ]
  }
}
```
