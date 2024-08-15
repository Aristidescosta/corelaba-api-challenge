import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INote } from '../../models';

export const getById = async (id: number): Promise<INote | Error> => {
  try {
    const result = await Knex(ETableNames.notes)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Nota não encontrada');
  } catch (error) {
    console.log(error);
    return Error('Erro ao consultar a nota');
  };
};