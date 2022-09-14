import { getMockReq, getMockRes } from '@jest-mock/express';
import { faker } from '@faker-js/faker';
import Repository from './repository';
import controller from './controller';
import GetUserResponse from './interfaces/get-user-response';

jest.mock('./repository');

const RepositoryMock = Repository as jest.MockedClass<typeof Repository>;

describe('Test post controller', () => {
  beforeEach(async () => {
    RepositoryMock.prototype.getUser.mockRestore();
  });

  test('Should response 200 when call getUser with sucess', async () => {
    const username = faker.datatype.string();

    const mockRequest = getMockReq({
      params: {
        username,
      },
    });

    const userMock: GetUserResponse = {
      username,
      createdAt: faker.datatype.string(),
      postsCount: faker.datatype.number(),
    };

    const { res, next } = getMockRes();

    RepositoryMock.prototype.getUser.mockResolvedValue(userMock);

    await controller.getUser(mockRequest, res, next);

    expect(RepositoryMock.prototype.getUser).toBeCalledTimes(1);
    expect(RepositoryMock.prototype.getUser).toBeCalledWith(username);
    expect(res.status).toBeCalledTimes(1);
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledTimes(1);
    expect(next).toBeCalledTimes(0);
  });

  test('Should return error when call getUser with exception', async () => {
    const username = faker.datatype.string();

    const mockRequest = getMockReq({
      params: {
        username,
      },
    });

    const mockError = new Error('Any Error.');

    const { res, next } = getMockRes();

    RepositoryMock.prototype.getUser.mockRejectedValue(mockError);

    await controller.getUser(mockRequest, res, next);

    expect(RepositoryMock.prototype.getUser).toBeCalledTimes(1);
    expect(res.status).not.toBeCalled();
    expect(res.json).not.toBeCalled();
    expect(next).toBeCalledTimes(1);
    expect(next).toBeCalledWith(mockError);
  });
});
