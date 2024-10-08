import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { INote } from '../../database/models';
import { IParamsProps } from './GetById';
import { IBodyProps } from './Create';
import { NotesProvider } from '../../database/providers/notes';

export const updateByIdValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    title: yup.string().required().min(3),
    description: yup.string().min(5).max(255),
    isFavorite: yup.boolean().required(),
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


export const updateById = async (req: Request<IParamsProps, {}, INote>, res: Response) => {
  const { id } = req.params;
  const task = req.body;

  if (!id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado'
      }
    });
  }

  const result = await NotesProvider.updateById(id, task);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).json(result);
};