/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("tasks").del();
  await knex("tasks").insert([
    {
      id: 1,
      task_name: "Pack for Europe",
      description:
        "Pack check-in and carry-on suitcases for 1 month in Europe.",
      stars_required: 5,
      reward_id: 5,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      task_name: "Get feed topper for Pudding",
      description:
        "Buy 2 diff types of food toppers for Pudding's meals, 1x fish and 1x chicken",
      stars_required: 1,
      reward_id: 1,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      task_name: "Do a Costco run",
      description: "Get souvenirs for Europe from Costco: veggie crackers",
      stars_required: 2,
      reward_id: 2,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      task_name: "Review flight info for Europe",
      description:
        "Check if it's possible to choose seats and update renewed passport info",
      stars_required: 1,
      reward_id: 3,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 5,
      task_name: "Deploy wabisabi app",
      description:
        "Deploy the wabisabi app on Heroku",
      stars_required: 30,
      reward_id: 4,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
