import { validateBody } from '../../middlewares/validation';
import userController from './controller';
import validation from './validations/validation';

export default [
  {
    method: 'post',
    path: '/v1/user',
    handlers: [
      validateBody(validation.createUserValidationBody),
      userController.createUser,
    ],
  },
];
