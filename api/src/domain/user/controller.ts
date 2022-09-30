import { NextFunction, Request, Response } from 'express';
import UserRepository from './repository';

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new UserRepository();
    const response = await repository.createUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

export default {
  createUser,
};
