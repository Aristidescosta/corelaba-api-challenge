import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITask } from '../../models';

export const updateById = async (id: number, task: Omit<ITask, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.tasks)
      .update(task)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar a tarefa');
  } catch (error) {
    console.log(error);
    return Error('Erro ao atualizar a tarefa');
  };
};