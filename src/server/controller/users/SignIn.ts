import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UserProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';

export interface IBodyProps extends Omit<IUser, 'id' | 'name'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  }))
}));


export const signIn = async (req: Request<{}, {}, IUser>, res: Response) => {
  const { email, password } = req.body;

  const result = await UserProvider.getByEmail(email);

  /* const result = await UserProvider.create(user); */
  if (result instanceof Error || result.password !== password) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha inválida'
      }
    });
  } else {
    return res.status(StatusCodes.OK).json({
      accessToken: 'teste.teste.teste'
    });
  }



  return res.status(StatusCodes.CREATED).json(result);
};