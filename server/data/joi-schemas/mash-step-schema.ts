/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const mashStepSchema = {
  mash_step_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  mash_profile_id: Joi.number(),
  type: Joi.string(), // TODO: Custom Type
  infuse_amount: Joi.number(),
  step_temp: Joi.number(),
  step_time: Joi.number(),
  ramp_time: Joi.number(),
  end_temp: Joi.number(),
  updated: Joi.date(),
  created: Joi.date()
};

export default mashStepSchema;
