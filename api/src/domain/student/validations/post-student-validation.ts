import Joi, { CustomHelpers } from '@hapi/joi';
import { cpf } from 'cpf-cnpj-validator';

const cpfValidate = (value: any, helpers: CustomHelpers) => {
  if (!cpf.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const postStudentBody = {
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cpf: Joi.string().required().custom(cpfValidate),
};

export default {
  body: Joi.object(postStudentBody),
};
