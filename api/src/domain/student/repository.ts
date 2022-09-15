import { getRepository } from 'typeorm';
import { studentErrorKeys, studentErrorMessages } from '../../errors/translator/student';
import HttpError from '../../errors/http-error';
import Student from './entities/student';

export default class StudentRepository {
  private async generateRa(): Promise<string> {
    return `${new Date().getFullYear()}${Math.floor(Math.random() * 90000) + 10000}`;
  }

  public async createStudent(studentData: any): Promise<any> {
    try {
      const studentRepository = getRepository(Student);
      const student = await studentRepository.save({
        ...studentData,
        ra: this.generateRa(),
      });
      return student;
    } catch (error) {
      throw new HttpError(
        500,
        studentErrorKeys.CREATE_STUDENT_FAIL,
        studentErrorMessages[studentErrorKeys.CREATE_STUDENT_FAIL],
        {},
      );
    }
  }

  public async listStudents(): Promise<any> {
    try {
      const studentRepository = getRepository(Student);
      const students = await studentRepository.find();
      return students;
    } catch (error) {
      throw new HttpError(
        500,
        studentErrorKeys.GET_ALL_STUDENTS_FAIL,
        studentErrorMessages[studentErrorKeys.GET_ALL_STUDENTS_FAIL],
        {},
      );
    }
  }

  public async updateStudent(studentData: any, studentId: string): Promise<void> {
    try {
      const studentRepository = getRepository(Student);
      await studentRepository.update(studentId, studentData);
    } catch (error) {
      throw new HttpError(
        500,
        studentErrorKeys.UPDATE_STUDENT_FAIL,
        studentErrorMessages[studentErrorKeys.UPDATE_STUDENT_FAIL],
        {},
      );
    }
  }

  public async deleteStudent(studentId: string): Promise<void> {
    try {
      const studentRepository = getRepository(Student);
      await studentRepository.delete(studentId);
    } catch (error) {
      throw new HttpError(
        500,
        studentErrorKeys.DELETE_STUDENT_FAIL,
        studentErrorMessages[studentErrorKeys.DELETE_STUDENT_FAIL],
        {},
      );
    }
  }
}
