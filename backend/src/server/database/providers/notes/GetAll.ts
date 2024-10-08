import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INote } from '../../models';

interface IPaginatedResult<T> {
  data: T[];
  total: number;
  pages: number;
  itemsPerPage: number;
}

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPaginatedResult<INote> | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.notes)
      .count<[{ count: string }]>('* as count')
      .where('title', 'ilike', `%${filter}%`);

    const totalItems = Number(count);

    const totalPages = Math.ceil(totalItems / limit);

    const result = await Knex(ETableNames.notes)
      .select('*')
      .where('id', Number(id ? id : 0))
      .orWhere('title', 'ilike', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.notes)
        .select('*')
        .where('id', '=', id)
        .first();
      if (resultById) return { data: [...result, resultById], total: totalItems, pages: totalPages, itemsPerPage: limit };
    }

    return { data: result, total: totalItems, pages: totalPages, itemsPerPage: limit };
  } catch (error) {
    console.log(error);
    return Error('Erro ao consultar as notas');
  }
};
