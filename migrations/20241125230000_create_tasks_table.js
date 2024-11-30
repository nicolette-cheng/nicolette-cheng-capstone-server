/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table
      .integer("reward_id")
      .unsigned()
      .references("id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("task_name").notNullable();
    table.string("description").notNullable();
    table.integer("stars_required").notNullable();
    table.date("created_at").defaultTo(knex.raw("CURRENT_DATE"));
    table.date("updated_at").defaultTo(knex.raw("CURRENT_DATE"));
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable("tasks");
}
