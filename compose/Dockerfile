FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --save-dev nodemon

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
