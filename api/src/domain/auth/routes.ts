import { validateBody } from '../../middlewares/validation';
import userController from './controller';
import validation from './validations/validation';

export default [
  {
    method: 'post',
    path: '/v1/auth',
    handlers: [
      validateBody(validation.createTokenValidationBody),
      userController.createToken,
    ],
  },
];
