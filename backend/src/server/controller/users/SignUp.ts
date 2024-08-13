import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UserProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';

export interface IBodyProps extends Omit<IUser, 'id'> { }

export const signUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    name: yup.string().required().min(3)
  }))
}));


export const signUp = async (req: Request<{}, {}, IUser>, res: Response) => {
  const user = req.body;
  const result = await UserProvider.create(user);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};