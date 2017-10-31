FROM node:8

ENV NODE_ENV=production

WORKDIR /app

COPY package.json .
RUN npm install --production && node index.js
