FROM node:20 AS build

WORKDIR /app

COPY planner/src/package*.json ./

RUN npm install

COPY planner ./

RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]

EXPOSE 5000