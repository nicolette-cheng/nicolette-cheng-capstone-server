import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  const { s } = req.query;
  try {
    const query = knex("tasks")
      .join("rewards", "tasks.reward_id", "rewards.id")
      .select(
        "tasks.id",
        "rewards.name",
        "tasks.name",
        "tasks.description",
        "tasks.stars"
      );

    if (s) {
      query.where(function () {
        this.where("tasks.name", "like", `%${s}%`)
          .orWhere("rewards.name", "like", `%${s}%`)
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
