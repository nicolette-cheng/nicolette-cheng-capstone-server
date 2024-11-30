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
      );
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

const getSingleTask = async (req, res) => {
  try {
    const taskFound = await knex("tasks")
      .select(
        "id",
        "task_name",
        "description",
        "stars_required",
        knex.raw("DATE(created_at) as created_at"),
        knex.raw("DATE(updated_at) as updated_at")
      )
      .where({
        id: req.params.id,
      });

    if (taskFound.length === 0) {
      return res.status(404).json({
        message: `Task with ID ${req.params.id} not found`,
      });
    }

    const taskData = taskFound[0];
    res.json(taskData);
  } catch (error) {
    res.status(500).json({
      message: `Unacle to retrieve task data for task with ID ${req.params.id}`,
    });
  }
};

// const createTaskItem = async (req,res) => {

// }

export { index, getSingleTask };
