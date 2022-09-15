import Joi from '@hapi/joi';

const deleteStudentParams = {
  id: Joi.string().required(),
};

export default {
  params: Joi.object(deleteStudentParams),
};
