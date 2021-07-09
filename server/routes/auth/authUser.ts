import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {authUser} from '../../data/auth/authUser';
import constants from '../../lib/constants';
import authSchema from '../../data/joi-schemas/authSchema';

const route: ServerRoute = {
  method: 'POST',
  path: '/auth',
  handler: authUser,
  options: {
    auth: false,
    description: 'Authenticate a user in the databasae with a username and password',
    notes: '',
    tags: [],
    response: {
      schema: Joi.array().items(
        Joi.object({
          ...authSchema
        })
      ),
      sample: constants.responseSampling
    }
  }
};

export default route;
