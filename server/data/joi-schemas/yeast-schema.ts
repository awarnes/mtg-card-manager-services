/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const yeastSchema = {
  yeast_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  type: Joi.string(), // TODO: Custom Type
  form: Joi.string(), // TODO: Custom Type
  amount: Joi.number(),
  amount_is_weight: Joi.boolean(),
  laboratory: Joi.string(),
  product_id: Joi.string(),
  min_temperature: Joi.number(),
  max_temperature: Joi.number(),
  flocculation: Joi.string(), // TODO: Custom Type
  attenuation: Joi.number()
    .min(0)
    .max(100),
  notes: Joi.string(),
  best_for: Joi.string(),
  times_cultured: Joi.number(),
  max_reuse: Joi.number(),
  add_to_secondary: Joi.boolean(),
  updated: Joi.date(),
  created: Joi.date()
};

export default yeastSchema;
