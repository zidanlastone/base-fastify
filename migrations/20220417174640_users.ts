import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function(table){
    table.increments('id').notNullable();
    table.string('fullname').notNullable();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.datetime('verified_date').nullable();
    table.timestamp('updated_at').nullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}

