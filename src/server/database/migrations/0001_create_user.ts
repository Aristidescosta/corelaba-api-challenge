import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.user, table => {
      table.bigIncrements('id').primary().index();
      table.string('name').checkLength('>=', 3).checkLength('<=', 150).notNullable();
      table.string('email').unique().checkLength('>=', 5).notNullable().index();
      table.string('password').unique().checkLength('>=', 6).notNullable();


      table.comment('Tabela para armazenar as usuários');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.user}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.user)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.user}`);
    });
}

