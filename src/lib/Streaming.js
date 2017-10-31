const path = require('path');
const bls = require('bls');

function createEngine(RTMPPort) {
  const config = {
    log: path.join(__dirname, '../log/streams.log'),
    log_level: 1,
    max_client_num: 20,
    port: RTMPPort,
  };
  function startServer(clientHandler) {
    bls.start_server(config, clientHandler);
  }
  return {
    startServer,
  };
}

module.exports = {
  createEngine,
};
