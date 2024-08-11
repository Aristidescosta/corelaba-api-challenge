import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { ITask } from '../models';

export const seed = async (knex: Knex) => {
  /* knex(ETableNames.tasks).insert(
    {
      title: 'Concluir o teste',
      description: 'Se eu passar nesse teste minha vida vai mudar',
      isCompleted: false,
      color: '#FFF',
      isFavorite: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ); */

  const [{ count }] = await knex(ETableNames.tasks).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;


  const tasksToInsert: ITask[] = Array.from({ length: 400 }, (_, index) => ({
    id: index + 1,
    title: `Task ${index + 1}`,
    description: `This is the description for task ${index + 1}`,
    isFavorite: Math.random() > 0.7,  // Randomly marks some tasks as favorite
    isCompleted: Math.random() > 0.5, // Randomly marks some tasks as completed
    color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`, // Random color
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await knex(ETableNames.tasks).insert(tasksToInsert);
};