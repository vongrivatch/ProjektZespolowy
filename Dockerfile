FROM node:20 AS build

RUN npm install

RUN npm run build

RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build", "-l", "5000"]

EXPOSE 5000