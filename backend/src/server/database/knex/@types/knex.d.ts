import { INote, IUser } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    tasks: INote
    user: IUser
  }
}