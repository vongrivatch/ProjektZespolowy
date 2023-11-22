# Etap 1: Zbuduj aplikację React z folderu 'flashcard-frontend'
FROM node:20 AS build-frontend

WORKDIR /app

# Skopiuj pliki 'package.json' i 'package-lock.json' oraz zainstaluj zależności
COPY flashcard-frontend/package*.json ./
RUN npm install

# Skopiuj pozostałe pliki frontendu i zbuduj projekt
COPY flashcard-frontend/ ./

# Ustawienie zmiennej środowiskowej dla Node.js 17+, aby używać starszej implementacji OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# Etap 2: Zbuduj serwer backendowy
FROM node:20

# Ustaw katalog roboczy dla backendu
WORKDIR /backend

# Skopiuj zbudowaną aplikację frontendową do katalogu 'build' w serwerze
COPY --from=build-frontend /app/build /backend/build

# Skopiuj backendowe 'package.json' i 'package-lock.json' oraz zainstaluj zależności
COPY package*.json ./
RUN npm install --only=production

# Skopiuj pozostałe pliki backendu
COPY server.js ./

EXPOSE 3001

CMD ["node", "server.js"]
