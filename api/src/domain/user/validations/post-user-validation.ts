import Joi from '@hapi/joi';

const postUserBody = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

export default {
  body: Joi.object(postUserBody),
};
