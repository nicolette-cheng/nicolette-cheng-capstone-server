import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  const { s } = req.query;

  try {
    const query = knex("rewards").select(
      "id",
      "reward_name",
      "description",
      "stars_required"
    );

    if (s) {
      query.where(function () {
        this.where("reward_name", "like", `%${s}%`)
          .orWhere("description", "like", `%${s}%`)
          .orWhere("stars", "like", `%${s}%`);
      });
    }

    const data = await query;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(`Error retrieving rewards: ${error}`);
  }
};

export { index };
