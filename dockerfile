FROM node:14.16.0

WORKDIR /usr/src/inexusapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm","run","start"]
