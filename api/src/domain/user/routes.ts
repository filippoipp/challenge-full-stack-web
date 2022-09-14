import { validateParams } from '../../middlewares/validation';
import userController from './controller';
import validation from './validations/validation';

export default [
  {
    method: 'get',
    path: '/private/v1/user/:username',
    handlers: [
      validateParams(validation.getUserValidationParams),
      userController.getUser,
    ],
  },
];
