/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("rewards", (table) => {
    table.increments("id").primary();
    table.string("reward_name").notNullable();
    table.string("description").notNullable();
    table.integer("stars_required").notNullable().defaultTo(0);
    table.integer("stars_allocated").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("rewards");
}
