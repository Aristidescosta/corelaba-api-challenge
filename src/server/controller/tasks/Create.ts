import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  color: string
}

export const create = (req: Request<{}, {}, ITask>, res: Response) => {
  console.log(req.body);
  return res.status(StatusCodes.CREATED).send('Tarefa criada com sucesso');
};