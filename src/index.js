const express = require('express');
const {createEngine, createHandler} = require('./lib/Streaming');

const {PORT, RTMP_PORT} = process.env;

const app = express();
const streamEngine = createEngine(RTMP_PORT);

streamEngine.startServer(client => {
  client.on('connect', (tsId, conInfo) => {
    client.accept(true);
    console.log('CLIENT CONNECTED', tsId, conInfo);
  });

  client.on('publish', (tsId, cmdObjs, name) => {
    console.log('CLIENT START PUBLISH', tsId, cmdObjs, name);
    streamEngine.publish(client, tsId, name || 'TEST_STREAM');
  });

  client.on('unpublish', () => {
    console.log('CLIENT UNPUBLISH');
    streamEngine.unpublish();
  });

  client.enable_av_cb((type, timestamp, isSh, isKey, data) => {
    console.log('DATA SENT BY CLIENT', type, timestamp, data);
    console.log(
      'get a %s data. ts:%d, is sequence header:%s, is key frame:%s',
      type,
      timestamp,
      isSh,
      isKey
    );
  });
});

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
