import { NextFunction, Request, Response } from 'express';
import AuthRepository from './repository';

async function createToken(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new AuthRepository();
    const response = await repository.createToken(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export default {
  createToken,
};
