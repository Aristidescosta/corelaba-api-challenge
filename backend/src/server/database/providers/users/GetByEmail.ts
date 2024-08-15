import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUser } from '../../models';

export const getByEmail = async (email: string): Promise<IUser | Error> => {
  try {
    const result = await Knex(ETableNames.user)
      .select('*')
      .where('email', '=', email)
      .first();

    if (result) return result;

    return new Error('Usuario não não encontrado');
  } catch (error) {
    console.log(error);
    return Error('Erro ao consultar a nota');
  };
};