/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const hopsSchema = {
  hops_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  alpha: Joi.number()
    .min(0)
    .max(100),
  amount: Joi.number(),
  use: Joi.string(), // TODO: Custom Type
  time: Joi.number(),
  notes: Joi.string(),
  type: Joi.string(), // TODO: Custom Type
  form: Joi.string(), // TODO: Custom Type
  beta: Joi.number()
    .min(0)
    .max(100),
  hsi: Joi.number()
    .min(0)
    .max(100),
  origin: Joi.string(),
  substitutes: Joi.string(),
  humulene: Joi.number()
    .min(0)
    .max(100),
  caryophyllene: Joi.number()
    .min(0)
    .max(100),
  cohumulone: Joi.number()
    .min(0)
    .max(100),
  myrcene: Joi.number()
    .min(0)
    .max(100),
  updated: Joi.date(),
  created: Joi.date()
};

export default hopsSchema;
