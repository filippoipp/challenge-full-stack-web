import { getRepository } from 'typeorm';
import { userErrorKeys, userErrorMessages } from '../../errors/translator/user';
import HttpError from '../../errors/http-error';
import User from './entities/user';
import CreateUserRequest from './interfaces/inputs/create-user-dto';

export default class UserRepository {
  public async createUser(userData: CreateUserRequest): Promise<User> {
    try {
      const userRepository = getRepository(User);
      const user = await userRepository.save(userRepository.create(userData));
      delete user.password;

      return user;
    } catch (error) {
      throw new HttpError(
        500,
        userErrorKeys.CREATE_USER_FAIL,
        userErrorMessages[userErrorKeys.CREATE_USER_FAIL],
        {},
      );
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const userRepository = getRepository(User);
      return await userRepository.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpError(
        500,
        userErrorKeys.FIND_USER_FAIL,
        userErrorMessages[userErrorKeys.FIND_USER_FAIL],
        {},
      );
    }
  }
}
