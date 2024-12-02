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

const getSingleReward = async (req, res) => {
  try {
    const rewardFound = await knex("rewards")
      .select(
        "id",
        "reward_name",
        "description",
        "stars_required",
        knex.raw("DATE(created_at) as created_at"),
        knex.raw("DATE(updated_at) as updated_at")
      )
      .where({
        id: req.params.id,
      });

    if (rewardFound.length === 0) {
      return res.status(404).json({
        message: `Reward with ID ${req.params.id} not found`,
      });
    }

    const rewardData = rewardFound[0];
    res.json(rewardData);
  } catch (error) {
    res.status(500).json({
      message: `Unacle to retrieve reward data for task with ID ${req.params.id}`,
    });
  }
};

export { index, getSingleReward };
