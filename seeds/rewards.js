/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("rewards").del();
  await knex("rewards").insert([
    {
      id: 1,
      reward_name: "Brunch at Foundry Tavern",
      description:
        "Book a brunch reso at Foundry Tavern for AYCE brunch $40/pp",
      stars_required: 10,
      stars_allocated: 0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 2,
      reward_name: "Upgrade desk: buy macbook dock",
      description:
        "Invest in a dock for my Macbook air to have a cleaner desk setup",
      stars_required: 8,
      stars_allocated: 0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 3,
      reward_name: "Hotpot dinner",
      description: "Have a boujee hotpot dinner at home",
      stars_required: 8,
      stars_allocated: 0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 4,
      reward_name: "Vancouver trip",
      description: "Go to Vancouver to visit Katie",
      stars_required: 50,
      stars_allocated: 0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      id: 5,
      reward_name: "Buy Hades 2",
      description: "Buy the Hades 2 game on steam",
      stars_required: 15,
      stars_allocated: 0,
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
