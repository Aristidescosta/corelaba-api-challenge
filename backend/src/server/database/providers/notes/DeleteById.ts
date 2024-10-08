import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';

export const deleteById = async (id: number): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.notes)
      .where('id', '=', id)
      .del();

    if (result > 0) return;

    return new Error('Erro ao apagar a nota');
  } catch (error) {
    console.log(error);
    return Error('Erro ao apagar a nota');
  };
};