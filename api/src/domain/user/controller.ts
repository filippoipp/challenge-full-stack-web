import { NextFunction, Request, Response } from 'express';

async function getUser(req: Request, res: Response, next: NextFunction) {
  try {


  } catch (error) {
    next(error);
  }
}

export default {
  getUser,
};
