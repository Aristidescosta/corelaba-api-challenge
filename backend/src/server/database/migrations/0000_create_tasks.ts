import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.tasks, table => {
      table.bigIncrements('id').primary().index();
      table.string('title', 150).checkLength('<=', 150).notNullable();
      table.string('description', 255).checkLength('<=', 250).notNullable();
      table.boolean('isFavorite');
      table.string('color', 150).checkLength('<=', 150).notNullable();
      table.date('createdAt');
      table.date('updatedAt');

      table.comment('Tabela para armazenar as tarefas');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.tasks}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.tasks)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.tasks}`);
    });
}

