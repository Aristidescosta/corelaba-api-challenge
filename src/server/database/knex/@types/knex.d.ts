import { ITask } from '../../models';

declare module 'knex/types/tables' {
  interface Tables {
    tasks: ITask
    //users: IUsers
  }
}