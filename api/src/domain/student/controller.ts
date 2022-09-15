import { NextFunction, Request, Response } from 'express';

async function createStudent(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

async function listStudents(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req: Request, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}

export default {
  createStudent,
  listStudents,
  updateStudent,
  deleteStudent,
};
