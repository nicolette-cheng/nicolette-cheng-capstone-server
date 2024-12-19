/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("glimmers", (table) => {
    table.increments("id").primary();
    table
      .integer("glimmer_id")
      .unsigned()
      .references("id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.date("created_at").defaultTo(knex.raw("CURRENT_DATE"));
    table.string("entry").notNullable();
    // ***need to add a column to automate 1 star per entry
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("glimmers");
}
