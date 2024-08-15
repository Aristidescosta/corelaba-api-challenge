import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INote } from '../../models';

export const updateById = async (id: number, note: Omit<INote, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.notes)
      .update(note)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar a nota');
  } catch (error) {
    console.log(error);
    return Error('Erro ao atualizar a nota');
  };
};