/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const authSchema = {
  username: Joi.string().min(1),
  newPassword: Joi.string().min(1)
};

export default authSchema;
