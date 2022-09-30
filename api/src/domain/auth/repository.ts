import { authErrorKeys, authErrorMessages } from '../../errors/translator/auth';
import HttpError from '../../errors/http-error';
import CreateTokenRequest from './interfaces/inputs/create-token-dto';
import UserRepository from '../user/repository';
import { generateToken } from '../../utils/jwt.utils';
import CreateTokenResponse from './interfaces/outputs/create-token-dto';

export default class AuthRepository {
  private async validateUser(authData: CreateTokenRequest) {
    const { email, password } = authData;
    const userRepository = new UserRepository();
    const user = await userRepository.findByEmail(email);
    if (!(await user.validatePassword(password))) {
      throw new Error();
    }

    return user;
  }

  public async createToken(authData: CreateTokenRequest): Promise<CreateTokenResponse> {
    try {
      const user = await this.validateUser(authData);
      delete user.password;

      return {
        ...user,
        access_token: generateToken(),
      };
    } catch (error) {
      throw new HttpError(
        500,
        authErrorKeys.CREATE_TOKEN_FAIL,
        authErrorMessages[authErrorKeys.CREATE_TOKEN_FAIL],
        {},
      );
    }
  }
}
