// import seed data files, arrays of objects
import tasksData from "../seed-data/tasks.js";
import rewardsData from "../seed-data/rewards.js";

export async function seed(knex) {
  try {
    // Clear existing data in the correct order to maintain referential integrity
    await knex("reward").del(); // Clear rewards first because tasks might reference rewards
    await knex("task").del(); // Clear tasks after rewards

    // Insert seed data
    await knex("task").insert(tasksData);
    await knex("reward").insert(rewardsData);

    console.log("Seeding successful!");
  } catch (error) {
    console.error("Error during seeding:", error);
    throw error; // Propagate the error if something goes wrong
  }
}