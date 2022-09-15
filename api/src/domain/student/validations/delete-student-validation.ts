import Joi from '@hapi/joi';

const getUserParams = {
  username: Joi.string().max(14).required(),
};

export default {
  params: Joi.object(getUserParams),
};
