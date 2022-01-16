FROM node:14

# RUN apt-get update && apt-get install -y python3
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm ci
RUN npm rebuild node-sass
