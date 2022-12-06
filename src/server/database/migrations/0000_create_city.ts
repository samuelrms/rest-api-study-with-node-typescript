import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.city, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("name", 150).checkLength("<=", 150).index().notNullable();
      table.string("country", 50).index().notNullable();

      table.comment("Table used to store cities with system states.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`# Dropped table ${ETableNames.city}`);
  });
}
