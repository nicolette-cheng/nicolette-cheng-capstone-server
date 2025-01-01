/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("glimmers", (table) => {
    table.increments("id").primary()
    .string("entry", 1000).notNullable()
    .integer("stars_earned").defaultTo(1).notNullable()
    .timestamp("created_at").defaultTo(knex.fn.now()).notNullable()
    .timestamp("updated_at").defaultTo(knex.fn.now()).notNullable();
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("glimmers");
}
