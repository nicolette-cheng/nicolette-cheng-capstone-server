/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
      .createTable("task", (table) => {
        table.increments("id").primary();
        table.string("task_name", 100).notNullable();
        table.string("task_description", 1000).notNullable();
        table.integer("stars").notNullable().defaultTo(0); // Total stars for the task
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("reward", (table) => {
        table.increments("id").primary();
        table.string("reward_name", 100).notNullable();
        table.string("reward_description", 1000).notNullable();
        table.integer("stars").notNullable().defaultTo(0); // Total stars allocated to the reward
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("user")
          .onUpdate("CASCADE")
          .onDelete("CASCADE"); // Link to the user who created the reward
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("task_reward", (table) => {
        table.increments("id").primary();
        table
          .integer("task_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("task")
          .onUpdate("CASCADE")
          .onDelete("CASCADE"); // If a task is deleted, remove associated allocations
        table
          .integer("reward_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("reward")
          .onUpdate("CASCADE")
          .onDelete("CASCADE"); // If a reward is deleted, remove associated allocations
        table.integer("stars_allocated").notNullable().defaultTo(0); // Stars allocated from the task to the reward
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema
      .dropTableIfExists("task_reward")
      .dropTableIfExists("reward")
      .dropTableIfExists("task");
  }