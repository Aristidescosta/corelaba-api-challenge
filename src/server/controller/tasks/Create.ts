import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  color: string;

}

interface IFilter {
  filter: string;
}


export const createValidation = validation((getSchema) => ({
  body: getSchema<ITask>(yup.object({
    title: yup.string().required().min(5),
    description: yup.string().required().max(255),
    isCompleted: yup.boolean().required(),
    color: yup.string().required().min(3).max(255),
  })),
  query: getSchema<IFilter>(
    yup.object({
      filter: yup.string().required().min(3),
    })
  ),
}));


export const create = async (req: Request<{}, {}, ITask>, res: Response) => {

  const { title } = req.body;

  return res.status(StatusCodes.CREATED).send(`Tarefa "${title}" criada com sucesso`);
};