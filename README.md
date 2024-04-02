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

#### Query example:
```
query {
  getForecastByCoordinates(latitude: 60.1695, longitude: 24.9354, days: 3) {
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
        "timestamp": "2024-03-27T00:00",
        "temperature": 0.9,
        "humidity": 96,
        "windSpeed": 16.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-03-27T01:00",
        "temperature": 0.9,
        "humidity": 96,
        "windSpeed": 16.6,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-03-27T02:00",
        "temperature": 0.8,
        "humidity": 96,
        "windSpeed": 15.1,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "temperatureUnit": "C"
      },
      {
        "location": {
          "latitude": 60.1695,
          "longitude": 24.9354
        },
        "timestamp": "2024-03-27T03:00",
        "temperature": 0.5,
        "humidity": 96,
        "windSpeed": 14.8,
        "cloudCover": 100,
        "sunshineDuration": 0,
        "temperatureUnit": "C"
      },
      ...
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
