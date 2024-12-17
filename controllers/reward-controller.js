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

const createRewardItem = async (req, res) => {
  const { reward_name, description, stars_required } = req.body;
  const stars = Number(stars_required);

  if (
    !reward_name?.trim() ||
    !description?.trim() ||
    !Number.isInteger(stars)
  ) {
    return res.status(400).json({
      message:
        "Invalid or missing data in request body. Please ensure all field are correctly entered and the stars required quantity is a number value.",
    });
  }

  try {
    const newReward = {
      reward_name,
      description,
      stars_required: stars,
    };

    const [newRewardId] = await knex("rewards").insert(newReward);

    res.status(201).json({ id: newRewardId, ...newReward });
  } catch (error) {
    res.status(500).send(`Error creating new reward: ${error}`);
  }
};

const editRewardItem = async (req, res) => {
  const { reward_name, description, stars_required } = req.body;
  const stars = Number(stars_required);
  const { id } = req.params;

  // Validation checks
  if (!reward_name?.trim() || !description?.trim() || !Number.isInteger(stars)) {
    return res.status(400).json({
      message: "Invalid or missing data in request body. Please ensure all fields are correctly entered and the stars required quantity is a number value."
    });
  }

  try {
    // Check if reward exists
    const rewardItemExists = await knex("rewards")
      .select("id")
      .where({ id })
      .first();

    if (!rewardItemExists) {
      return res.status(404).json({ 
        message: `Reward item with ID ${id} not found.` 
      });
    }

    // Prepare update data with stars conversion
    const updatedItem = {
      reward_name: reward_name.trim(),
      description: description.trim(),
      stars_required: stars,
      updated_at: knex.fn.now() // Add timestamp for update
    };

    // Perform update
    await knex("rewards")
      .where({ id })
      .update(updatedItem);

    // Fetch updated reward
    const updatedRewardItem = await knex("rewards")
      .select([
        "id",
        "reward_name",
        "description",
        "stars_required",
        knex.raw("DATE(updated_at) as updated_at")
      ])
      .where({ id })
      .first();

    res.status(200).json(updatedRewardItem);
  } catch (error) {
    console.error("Error updating reward:", error); // Add logging
    res.status(500).json({ 
      message: "Error editing reward item", 
      error: error.message 
    });
  }
};

export { index, getSingleReward, createRewardItem, editRewardItem };
