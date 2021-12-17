FROM node:latest

WORKDIR /node-app

COPY . /node-app/

RUN npm install

CMD [ "npm", "start" ]
