import { validateParams, validateBody } from '../../middlewares/validation';
import studentController from './controller';
import validation from './validations/validation';

export default [
  {
    method: 'post',
    path: '/private/v1/student',
    handlers: [
      validateBody(validation.createStudentValidationBody),
      studentController.createStudent,
    ],
  },
  {
    method: 'get',
    path: '/private/v1/student',
    handlers: [
      studentController.listStudents,
    ],
  },
  {
    method: 'patch',
    path: '/private/v1/student/:id',
    handlers: [
      validateParams(validation.updateStudentValidationParams),
      validateBody(validation.updateStudentValidationBody),
      studentController.updateStudent,
    ],
  },
  {
    method: 'delete',
    path: '/private/v1/student/:id',
    handlers: [
      validateParams(validation.deleteStudentValidationParams),
      studentController.deleteStudent,
    ],
  },
];
