import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INote } from '../../models';

export const create = async (note: Omit<INote, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.notes).insert(note).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao criar a nota 1');
  } catch (error) {
    console.log(error);
    return Error('Erro ao criar a nota');
  };
};