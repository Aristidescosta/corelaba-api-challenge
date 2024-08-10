import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';

export interface IParamsProps {
  id?: number,
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object({
    id: yup.number().integer().moreThan(0),
  })),
}));


export const getById = async (req: Request<IParamsProps>, res: Response) => {
  console.log(req.query);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Método não implementado!');
};