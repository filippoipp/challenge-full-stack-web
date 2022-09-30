import { validateBody } from '../../middlewares/validation';
import userController from './controller';
import validation from './validations/validation';

export default [
  {
    method: 'post',
    path: '/private/v1/auth',
    handlers: [
      validateBody(validation.createTokenValidationBody),
      userController.createToken,
    ],
  },
];
