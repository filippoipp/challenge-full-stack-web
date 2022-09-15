import { NextFunction, Request, Response } from 'express';

async function createStudent(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export default {
  createStudent,
};
