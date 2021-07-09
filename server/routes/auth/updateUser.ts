import {ServerRoute} from '@hapi/hapi';
import Joi from '@hapi/joi';

import {authUser} from '../../data/auth/authUser';
import constants from '../../lib/constants';
import authSchema from '../../data/joi-schemas/authSchema';

const route: ServerRoute = {
  method: 'GET',
  path: '/',
  handler: authUser,
  options: {
    auth: false,
    description: '',
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
