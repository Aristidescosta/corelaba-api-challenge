import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  color: string;

}

const validationSchema: yup.Schema<ITask> = yup.object({
  title: yup.string().required().min(5),
  description: yup.string().required().max(255),
  isCompleted: yup.boolean().required(),
  color: yup.string().required().min(3).max(255),
});


export const createBodyValidator: RequestHandler = async(req, res, next) => {
  try {
    await validationSchema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach(error => {
      if (!error.path) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }
};

export const create = async (req: Request<{}, {}, ITask>, res: Response) => {

  const { title } = req.body;

  return res.status(StatusCodes.CREATED).send(`Tarefa "${title}" criada com sucesso`);
};