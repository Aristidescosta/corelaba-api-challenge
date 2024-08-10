import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { IParamsProps } from './GetById';
import { ITask } from './Create';

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<ITask>(yup.object({
    id: yup.string()/* .uuid() */.required(),
    title: yup.string().required().min(5),
    description: yup.string().max(255),
    isFavorite: yup.boolean().required(),
    isCompleted: yup.boolean().required(),
    color: yup.string().required().min(3).max(255),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })),
  query: getSchema<IParamsProps>(
    yup.object({
      id: yup.number().integer().moreThan(0),
    })
  ),
}));


export const updateById = async (req: Request<IParamsProps, {}, ITask>, res: Response) => {

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Método não implementado!');
};