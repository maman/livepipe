FROM node:8

WORKDIR /app

COPY package.json /app/package.json

RUN npm install -g nodemon@1.11.0 --quiet && \
    npm install --quiet && \
    npm ls && \
    mv /app/node_modules /node_modules

COPY . /app

CMD ["npm", "start"]
