FROM node:14.16.0

WORKDIR /usr/src/inexusapp

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm","run","dev"]
