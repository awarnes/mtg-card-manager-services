import {setupServer} from './server/server';

const startServer = async () => {
  const server = await setupServer();
  console.log('starting server at port: %s', server.info.port);
  server.start();
};

startServer();
