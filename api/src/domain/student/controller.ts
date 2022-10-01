import { NextFunction, Request, Response } from 'express';
import StudentRepository from './repository';

const repository = new StudentRepository();

async function createStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await repository.createStudent(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
}

async function listStudents(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await repository.listStudents();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function updateStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await repository.updateStudent(req.body, req.params.id);
    res.status(204).json(response);
  } catch (error) {
    next(error);
  }
}

async function deleteStudent(req: Request, res: Response, next: NextFunction) {
  try {
    const response = await repository.deleteStudent(req.params.id);
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
