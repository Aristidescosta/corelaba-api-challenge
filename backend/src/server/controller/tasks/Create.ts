import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { ITask } from '../../database/models/Tasks';
import { TasksProvider } from '../../database/providers/tasks';

export interface IBodyProps extends Omit<ITask, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    title: yup.string().required().min(5).max(150),
    description: yup.string().min(10).max(255),
    isFavorite: yup.boolean().required(),
    color: yup.string().required().min(3).max(150),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  }))
}));


export const create = async (req: Request<{}, {}, ITask>, res: Response) => {
  const task = req.body;
  const result = await TasksProvider.create(task);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json({ ...task, id: result });
};