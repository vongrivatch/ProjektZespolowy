# Użyj obrazu Node.js, aby zbudować aplikację React
FROM node:20 AS build

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj pliki package.json i zainstaluj zależności
COPY flashcard-frontend/package*.json ./
RUN npm install

# Skopiuj pozostałe pliki frontendu i zbuduj projekt
COPY flashcard-frontend/ ./

# Zbuduj aplikację React
RUN npm run build

# Zainstaluj globalnie pakiet serve, aby móc serwować aplikację
RUN npm install -g serve

# Polecenie, które zostanie uruchomione po uruchomieniu kontenera serwuje aplikację
CMD ["serve", "-s", "build", "-l", "5000"]

# Zadeklaruj, że w kontenerze będzie otwarty port 5000
EXPOSE 5000
