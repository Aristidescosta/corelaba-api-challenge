import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INote } from '../../models';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<INote[] | Error> => {
  try {
    const result = await Knex(ETableNames.notes)
      .select('*')
      .where('id', Number(id ? id : 0))
      .orWhere('title', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.notes)
        .select('*')
        .where('id', '=', id)
        .first();
      if (resultById) return [...result, resultById];
    }
    return result;
  } catch (error) {
    console.log(error);
    return Error('Erro ao consultar as notas');
  };
};