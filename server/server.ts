import 'bluebird-global';
import {Server} from '@hapi/hapi';
import routes from './plugins/routes';

const port = process.env.PORT || 3000;

async function setupServerImpl(plugins: any): Promise<Server> {
  const server = new Server({
    host: '0.0.0.0',
    port
  });

  return Promise.mapSeries(plugins, plugin => server.register(plugin as any)).then(() => server);
}

export function setupServer(): Promise<Server> {
  return setupServerImpl([routes]);
}
