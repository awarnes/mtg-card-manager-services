import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';
import constants from '../lib/constants';
import testDbConnection from '../data/testDbConnection';

const route: ServerRoute = {
  method: 'GET',
  path: '/test',
  options: {
    auth: false,
    handler: testDbConnection,
    description: 'Test DB Connection',
    notes: 'Get all tables from DB.',
    tags: ['test'],
    response: {
      schema: Joi.array().items(Joi.string()),
      sample: constants.responseSampling
    }
  }
};

export default route;
