import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.notes, table => {
      table.bigIncrements('id').primary().index();
      table.string('title', 150).checkLength('<=', 150).notNullable();
      table.string('description', 255).checkLength('<=', 250).notNullable();
      table.boolean('isFavorite');
      table.string('color', 150).checkLength('<=', 150).notNullable();
      table.date('createdAt');
      table.date('updatedAt');

      table.comment('Tabela para armazenar as notas');
    })
    .then(() => {
      console.log(`# Create table ${ETableNames.notes}`);
    });
}


export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.notes)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.notes}`);
    });
}

