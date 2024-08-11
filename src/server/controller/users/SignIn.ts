import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import * as yup from 'yup';

import { UserProvider } from '../../database/providers/users';
import { validation } from '../../shared/middlewares';
import { IUser } from '../../database/models';
import { JWTService, PasswordCrypto } from '../../shared/services';

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

  if (result instanceof Error || !await PasswordCrypto.verifyPassword(password, result.password)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha inválida'
      }
    });
  } else {

    const accessToken = JWTService.signin({ uid: result.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        errors: {
          default: 'Erro ao gerar o token de acesso, tente novamente'
        }
      });
    };
    return res.status(StatusCodes.OK).json({ accessToken });
  }
};