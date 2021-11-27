FROM node:14.16.0

WORKDIR /usr/src/inexusapp

COPY package*.json ./

RUN npm install
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD [ "npm","run","build"]
