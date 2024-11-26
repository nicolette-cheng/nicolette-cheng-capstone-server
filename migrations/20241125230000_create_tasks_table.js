/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table
      .integer("rewards_id")
      .unsigned()
      .references("id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("task_name").notNullable();
    table.string("description").notNullable();
    table.integer("stars_required").notNullable();
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
  return knex.schema.dropTable("tasks");
}
