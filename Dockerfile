FROM node:20-alpine as build

WORKDIR /api

COPY . .

RUN npm install

FROM node:20-alpine

WORKDIR /api

COPY --from=build /api /api

EXPOSE 4445

CMD apk add --no-cache redis && redis-server --daemonize yes && npm run dev
