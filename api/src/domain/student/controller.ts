import { NextFunction, Request, Response } from 'express';
import StudentRepository from './repository';

async function createStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new StudentRepository();
    const response = await repository.createStudent(req.query);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function listStudents(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new StudentRepository();
    const response = await repository.listStudents(req.query);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new StudentRepository();
    const response = await repository.updateStudent(req.query);
    res.status(204).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const repository = new StudentRepository();
    const response = await repository.deleteStudent(req.query);
    res.status(204).json(response);
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
