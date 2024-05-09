FROM node:20 AS build
WORKDIR /app

COPY . .  
RUN npm install

RUN npm run build

COPY package*.json ./
RUN npm install serve

FROM node:20

COPY --from=build /app ./

EXPOSE 5000

CMD ["serve", "-s", "build", "-l", "5000"]

