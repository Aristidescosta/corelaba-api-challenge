import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { ITask } from '../../database/models';
import { IParamsProps } from './GetById';
import { IBodyProps } from './Create';

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    title: yup.string().required().min(3),
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

  return res.status(StatusCodes.OK).send('Método não implementado!');
};