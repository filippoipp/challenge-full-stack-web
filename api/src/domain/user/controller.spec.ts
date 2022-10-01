import { getMockReq, getMockRes } from '@jest-mock/express';
import { faker } from '@faker-js/faker';
import Repository from './repository';
import controller from './controller';
import User from './entities/user';

jest.mock('./repository');

const RepositoryMock = Repository as jest.MockedClass<typeof Repository>;

describe('Test user controller', () => {
  beforeEach(async () => {
    RepositoryMock.prototype.createUser.mockRestore();
  });

  test('Should response 201 when call createUser with sucess', async () => {
    const userMock = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockRequest = getMockReq({
      body: userMock,
    });

    const userResponseMock = {
      id: faker.datatype.uuid(),
      name: userMock.name,
      email: userMock.email,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
    } as User;

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createUser.mockResolvedValue(userResponseMock);

    await controller.createUser(mockRequest, res, next);

    expect(RepositoryMock.prototype.createUser).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.createUser).toBeCalledWith(userMock);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call createUser with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createUser.mockRejectedValue(mockError);

    await controller.createUser(mockRequest, res, next);

    expect(RepositoryMock.prototype.createUser).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });
});
