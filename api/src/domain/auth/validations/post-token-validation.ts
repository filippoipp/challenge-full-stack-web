import Joi from '@hapi/joi';

const postTokenBody = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export default {
  body: Joi.object(postTokenBody),
};
