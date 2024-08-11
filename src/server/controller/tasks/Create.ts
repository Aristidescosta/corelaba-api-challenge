import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { ITask } from '../../database/models/Tasks';

export interface IBodyProps extends Omit<ITask, 'id'> { }

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    title: yup.string().required().min(5),
    description: yup.string().max(255),
    isFavorite: yup.boolean().required(),
    isCompleted: yup.boolean().required(),
    color: yup.string().required().min(3).max(255),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  }))
}));


export const create = async (req: Request<{}, {}, ITask>, res: Response) => {

  return res.status(StatusCodes.CREATED).send('Método não implementado!');
};