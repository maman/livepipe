const express = require('express');
const {createEngine, createHandler} = require('./lib/Streaming');

const PORT = process.env.PORT;

const app = express();
const streamEngine = createEngine(process.env.RTMP_PORT);

streamEngine.startServer(client => {
  client.on('connect', (tsId, conInfo) => {
    client.accept(true);
    console.log('CONNECT', tsId, conInfo);
  });

  client.on('publish', (tsId, cmdObjs, name) => {
    console.log('PUBLISH', tsId, cmdObjs, name);
  });

  client.on('play', () => {});

  client.enable_av_cb((type, timestamp, isSh, isKey, data) => {
    console.log('AVCB', type, timestamp, isSh, isKey, data);
  });
});

app.get('/', (req, res) => {
  res.send('Hello worldi!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
