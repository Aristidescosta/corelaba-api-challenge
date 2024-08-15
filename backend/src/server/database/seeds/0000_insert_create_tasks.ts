import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';
import { INote } from '../models';

export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.notes).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const notesToInsert: INote[] = Array.from({ length: 400 }, (_, index) => ({
    id: index + 1,
    title: `Note ${index + 1}`,
    description: `This is the description for note ${index + 1}`,
    isFavorite: Math.random() > 0.7,
    color: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`, // Random color
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  await knex(ETableNames.notes).insert(notesToInsert);
};