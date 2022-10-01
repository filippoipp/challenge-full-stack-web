import { getMockReq, getMockRes } from '@jest-mock/express';
import { faker } from '@faker-js/faker';
import Repository from './repository';
import controller from './controller';
import Student from './entities/student';

jest.mock('./repository');

const RepositoryMock = Repository as jest.MockedClass<typeof Repository>;

describe('Test student controller', () => {
  beforeEach(async () => {
    RepositoryMock.prototype.createStudent.mockRestore();
    RepositoryMock.prototype.listStudents.mockRestore();
    RepositoryMock.prototype.updateStudent.mockRestore();
    RepositoryMock.prototype.deleteStudent.mockRestore();
  });

  test('Should response 200 when call listStudents with sucess', async () => {
    const mockRequest = getMockReq();

    const studentsMock: Student[] = [
      {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        ra: faker.datatype.string(),
        cpf: faker.datatype.string(),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
      },
      {
        id: faker.datatype.uuid(),
        name: faker.internet.userName(),
        email: faker.internet.email(),
        ra: faker.datatype.string(),
        cpf: faker.datatype.string(),
        createdAt: faker.datatype.datetime(),
        updatedAt: faker.datatype.datetime(),
      },
    ];

    const { res, next } = getMockRes();

    RepositoryMock.prototype.listStudents.mockResolvedValue(studentsMock);

    await controller.listStudents(mockRequest, res, next);

    expect(RepositoryMock.prototype.listStudents).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.listStudents).toBeCalledWith();
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call getUser with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.listStudents.mockRejectedValue(mockError);

    await controller.listStudents(mockRequest, res, next);

    expect(RepositoryMock.prototype.listStudents).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });

  test('Should response 201 when call createStudent with sucess', async () => {
    const studentMock = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      cpf: faker.datatype.string(),
    };

    const mockRequest = getMockReq({
      body: studentMock,
    });

    const studentResponseMock: Student = {
      name: studentMock.name,
      email: studentMock.email,
      cpf: studentMock.cpf,
      ra: faker.datatype.string(),
      id: faker.datatype.uuid(),
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    };

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createStudent.mockResolvedValue(studentResponseMock);

    await controller.createStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.createStudent).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.createStudent).toBeCalledWith(studentMock);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call createStudent with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createStudent.mockRejectedValue(mockError);

    await controller.createStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.createStudent).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });

  test('Should response 204 when call deleteStudent with sucess', async () => {
    const fakeStudentId = faker.datatype.uuid();

    const mockRequest = getMockReq({
      params: {
        id: fakeStudentId,
      },
    });

    const { res, next } = getMockRes();

    RepositoryMock.prototype.deleteStudent.mockResolvedValue();

    await controller.deleteStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.deleteStudent).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.deleteStudent).toBeCalledWith(fakeStudentId);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(204);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call deleteStudent with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.deleteStudent.mockRejectedValue(mockError);

    await controller.deleteStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.deleteStudent).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });

  test('Should response 204 when call updateStudent with sucess', async () => {
    const fakeStudentId = faker.datatype.uuid();

    const mockRequest = getMockReq({
      params: {
        id: fakeStudentId,
      },
    });

    const { res, next } = getMockRes();

    RepositoryMock.prototype.updateStudent.mockResolvedValue();

    await controller.updateStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.updateStudent).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.updateStudent).toBeCalledWith({}, fakeStudentId);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(204);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call updateStudent with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.updateStudent.mockRejectedValue(mockError);

    await controller.updateStudent(mockRequest, res, next);

    expect(RepositoryMock.prototype.updateStudent).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });
});
