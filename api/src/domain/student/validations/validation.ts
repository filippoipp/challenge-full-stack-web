import deleteStudentValidation from './delete-student-validation';
import patchStudentValidation from './patch-student-validation';
import postStudentValidation from './post-student-validation';

export default {
  createStudentValidationBody: postStudentValidation.body,
  updateStudentValidationParams: patchStudentValidation.params,
  updateStudentValidationBody: patchStudentValidation.body,
  deleteStudentValidationParams: deleteStudentValidation.params,
};
