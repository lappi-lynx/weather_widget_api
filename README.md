### GraphQL Apollo server (also supports REST API for dev needs)

#### Installation:
```
docker build -t forecast_backend .
docker run --rm -p 4445:4445 forecast_backend
```
Server available by URL:
http://localhost:4445/graphql

#### Query example:
```
 query {
     getForecastForLocation(latitude: 60.1695, longitude: 24.9354, forecast_days: 1) {
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

