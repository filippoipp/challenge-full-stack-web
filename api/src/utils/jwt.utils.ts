import {
  sign, SignOptions, verify, VerifyOptions,
} from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

export function generateToken() {
  const privateKey = {
    key: fs.readFileSync(path.join(__dirname, '../../private.pem')),
    passphrase: process.env.AUTH_PASSPHRASE,
  };

  const signInOptions: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '1h',
  };

  return sign({}, privateKey, signInOptions);
}

interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

export function validateToken(token: string): Promise<TokenPayload> {
  const publicKey = fs.readFileSync(path.join(__dirname, '../../public.pem'));

  const verifyOptions: VerifyOptions = {
    algorithms: ['RS256'],
  };

  return new Promise((resolve, reject) => {
    verify(token, publicKey, verifyOptions, (error, decoded: TokenPayload) => {
      if (error) return reject(error);

      resolve(decoded);
    });
  });
}
