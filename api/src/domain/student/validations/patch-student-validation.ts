import Joi from '@hapi/joi';

const patchStudentParams = {
  id: Joi.string().required(),
};

const patchStudentBody = {
  nome: Joi.string(),
  email: Joi.string().email(),
};

export default {
  params: Joi.object(patchStudentParams),
  body: Joi.object(patchStudentBody),
};
