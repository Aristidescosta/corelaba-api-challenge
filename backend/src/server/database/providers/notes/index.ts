import * as updateById from './UpdateById';
import * as deleteById from './DeleteById';
import * as getById from './GetById';
import * as getAll from './GetAll';
import * as create from './Create';
import * as count from './Count';

export const NotesProvider = {
  ...updateById,
  ...deleteById,
  ...create,
  ...count,
  ...getAll,
  ...getById
};