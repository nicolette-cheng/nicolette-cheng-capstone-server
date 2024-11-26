import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  const { s } = req.query;
  try {
    const query = knex("tasks")
      // .join()
      .select(
        "tasks.id",
        "tasks.task_name",
        "tasks.description",
        "tasks.stars_required"
        // "rewards.rewards_id",
        // knex.raw("JSON_ARRAYAGG(rewards.reward_name) as rewards")
      )
      // .groupBy("tasks.id");

    if (s) {
      query.where(function () {
        this.where("tasks.task_name", "like", `%${s}%`)
          .orWhere("rewards.reward_name", "like", `%${s}%`)
          .orWhere("tasks.description", "like", `%${s}%`)
          .orWhere("tasks.stars", "like", `%${s}%`);
      });
    }

    const data = await query;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).send(`Error retrieving Tasks: ${error}`);
  }
};

export { index };
