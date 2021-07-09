import {Server} from '@hapi/hapi';
import routes from '../routes';

const packageInfo = {
  version: '1'
}; //require('../../package');

export default {
  name: 'routes',
  version: packageInfo.version,
  register: (server: Server): void => {
    server.route(routes);
  }
};
