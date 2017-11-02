const bls = require('bls');

function createEngine(RTMPPort) {
  const config = {
    log: 'log/rtmpserver.log',
    log_level: 1,
    max_client_num: 20,
    port: RTMPPort,
  };
  let published = false;
  function startServer(clientHandler) {
    bls.start_server(config, clientHandler);
  }
  function publish(clientInstance, id, name) {
    if (!published) {
      published = true;
      clientInstance.publish(id, name);
      clientInstance.publish_stream_name = name;
    } else {
      clientInstance.close();
    }
  }
  function unpublish() {
    published = false;
  }
  return {
    startServer,
    publish,
    unpublish,
  };
}

module.exports = {
  createEngine,
};
