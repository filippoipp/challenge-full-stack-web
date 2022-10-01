import { getMockReq, getMockRes } from '@jest-mock/express';
import { faker } from '@faker-js/faker';
import Repository from './repository';
import controller from './controller';

jest.mock('./repository');

const RepositoryMock = Repository as jest.MockedClass<typeof Repository>;

describe('Test auth controller', () => {
  beforeEach(async () => {
    RepositoryMock.prototype.createToken.mockRestore();
  });

  test('Should response 201 when call createToken with sucess', async () => {
    const authMock = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const mockRequest = getMockReq({
      body: authMock,
    });

    const authResponseMock = {
      id: faker.datatype.uuid(),
      name: authMock.name,
      email: authMock.email,
      createdAt: faker.datatype.datetime(),
      updatedAt: faker.datatype.datetime(),
      access_token: faker.datatype.uuid(),
    };

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createToken.mockResolvedValue(authResponseMock);

    await controller.createToken(mockRequest, res, next);

    expect(RepositoryMock.prototype.createToken).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.createToken).toBeCalledWith(authMock);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(201);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call createToken with exception', async () => {
    const mockRequest = getMockReq();

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.createToken.mockRejectedValue(mockError);

    await controller.createToken(mockRequest, res, next);

    expect(RepositoryMock.prototype.createToken).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });
});
