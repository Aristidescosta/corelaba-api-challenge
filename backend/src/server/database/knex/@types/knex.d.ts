import { INote, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    notes: INote
    user: IUser
  }
}