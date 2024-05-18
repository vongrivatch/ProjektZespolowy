FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app/build ./build
COPY --from=build /app/package*.json ./
RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]
