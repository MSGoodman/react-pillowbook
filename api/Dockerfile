FROM node:16-alpine


RUN apk update && apk add bash
WORKDIR /app
COPY . .
RUN npm ci
RUN cd db/utils && node run_migrations
