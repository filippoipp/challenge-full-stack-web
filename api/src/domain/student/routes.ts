import { validateParams, validateBody } from '../../middlewares/validation';
import studentController from './controller';
import validation from './validations/validation';
import authorize from '../../middlewares/auth';

export default [
  {
    method: 'post',
    path: '/private/v1/student',
    handlers: [
      authorize(),
      validateBody(validation.createStudentValidationBody),
      studentController.createStudent,
    ],
  },
  {
    method: 'get',
    path: '/private/v1/student',
    handlers: [
      authorize(),
      studentController.listStudents,
    ],
  },
  {
    method: 'patch',
    path: '/private/v1/student/:id',
    handlers: [
      authorize(),
      validateParams(validation.updateStudentValidationParams),
      validateBody(validation.updateStudentValidationBody),
      studentController.updateStudent,
    ],
  },
  {
    method: 'delete',
    path: '/private/v1/student/:id',
    handlers: [
      authorize(),
      validateParams(validation.deleteStudentValidationParams),
      studentController.deleteStudent,
    ],
  },
];
