/* eslint-disable @typescript-eslint/camelcase */
import Joi from '@hapi/joi';

const waterSchema = {
  water_id: Joi.number(),
  name: Joi.string().min(1),
  version: Joi.number(),
  amount: Joi.number(),
  calcium: Joi.number(),
  bicarbonate: Joi.number(),
  sulfate: Joi.number(),
  chloride: Joi.number(),
  sodium: Joi.number(),
  magnesium: Joi.number(),
  ph: Joi.number(),
  notes: Joi.string(),
  updated: Joi.date(),
  created: Joi.date()
};

export default waterSchema;
