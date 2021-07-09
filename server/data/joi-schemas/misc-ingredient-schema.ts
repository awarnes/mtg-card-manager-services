/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const miscIngredientSchema = {
  misc_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  type: Joi.string(), // TODO: Custom Type
  use: Joi.string(), // TODO: Custom Type
  time: Joi.number(),
  amount: Joi.number(),
  amount_is_weight: Joi.boolean(),
  use_for: Joi.string(),
  notes: Joi.string(),
  updated: Joi.date(),
  created: Joi.date()
};

export default miscIngredientSchema;
