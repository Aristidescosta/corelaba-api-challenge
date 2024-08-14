import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ITask } from '../../models';

export const create = async (task: Omit<ITask, 'id'>): Promise<number | Error> => {
  try {
    console.log(task);
    const [result] = await Knex(ETableNames.tasks).insert(task).returning('id');

    if (typeof result === 'object') {
      return result.id;
    } else if (typeof result === 'number') {
      return result;
    }
    return new Error('Erro ao criar a tarefa 1');
  } catch (error) {
    console.log(error);
    return Error('Erro ao criar a tarefa' + error);
  };
};