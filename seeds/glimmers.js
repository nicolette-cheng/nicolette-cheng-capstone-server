/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function seed(knex) {
  await knex("glimmers").del();
  await knex("glimmers").insert([
    {
      id: 1,
      created_at: "2024-12-14 09:00:00", // YYYY-MM-DD HH:MM:SS format
      updated_at: "2025-01-01 09:00:00",
      entry:
        "1st full day in Copenhagen - went to the city centre with Ingrid, Tom and Andy. We came across a Danish spitz that looks a lot like Pudding! We had some bomb Asian food like pho and corn cheese hotteok.",
    },
    {
      id: 2,
      created_at: "2024-12-15 14:30:00",
      updated_at: "2025-01-01 14:30:00",
      entry:
        "It's Andy's last night in Copenhagen, we had hot put for dinner and played the boardgames Unmatched and Priorities together.",
    },
    {
      id: 3,
      created_at: "2024-12-16 14:30:00",
      updated_at: "2025-01-01 14:30:00",
      entry:
        "I went to IKEA with Ingrid for brunch, the food is even better than back home in Canada. The highlight was the croissant, I was shocked at how good the croissants are!!",
    },
    {
      id: 4,
      created_at: "2024-12-17 14:30:00",
      updated_at: "2025-01-01 14:30:00",
      entry:
        "Went to the Arhoj ceramics studio by the harbour today, Ingrid 'gifted' me 2x cute ceremic nuggets!",
    },
    {
      id: 5,
      created_at: "2024-12-18 14:30:00",
      updated_at: "2025-01-01 14:30:00",
      entry:
        "Ingrid and I binged through the available Dandadan episodes, I really like the show.",
    },
    {
      id: 6,
      created_at: "2024-12-31 14:30:00",
      updated_at: "2025-01-01 14:30:00",
      entry:
        "Went to the underground bar for Danish tapas and beers with Tom & Ingrid, turns out I quite like Danish bread that is more like a toasted cracker to me.",
    },
    {
      id: 7,
      created_at: "2025-01-01 14:30:00",
      updated_at: "2025-01-03 14:30:00",
      entry:
        "I pushed 11 contributions to my Github after not coding for almost 2 weeks. It felt good to be a bit productive! :) I'm proud of myself.",
    },
    {
      id: 8,
      created_at: "2025-01-02 14:30:00",
      updated_at: "2025-01-03 14:30:00",
      entry:
        "Visited the Danish Architecture Center today with Ingrid, I particularly enjoyed the Water is Coming exhibit on adapting life to the rise of water.",
    },
    {
      id: 9,
      created_at: "2025-01-03 14:30:00",
      updated_at: "2025-01-04 14:30:00",
      entry:
        "I finally tried onigiri from COMÉ RICE Kitchen! The rice was excellent, their menchi katsu was very nicely fried and juicy as well.",
    },
    {
      id: 10,
      created_at: "2025-01-05 14:30:00",
      updated_at: "2025-01-06 14:30:00",
      entry:
        "Went to the Louisiana Museum of Modern Art and really enjoyed their Ocean and Living Structures exhibits. Also had lunch at the cafe, got to try a Danish xmas lunch and my fave item was the duck breast. ",
    },
  ]);
}
