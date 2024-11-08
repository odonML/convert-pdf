FROM ubuntu
RUN apt-get update && apt-get install libreoffice -y && apt-get install -y curl && curl -sL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs
WORKDIR /usr/src/build
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3001
CMD npm start