import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (req, res) => {
  const { s } = req.query;
  try {
    const query = knex("tasks")
      .join("rewards", "tasks.reward_id", "rewards.id")
      .select(
        "tasks.id",
        "tasks.task_name",
        "tasks.description",
        "tasks.stars_required",
        "rewards.reward_name"
      );

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

const createTaskItem = async (req, res) => {
  const { task_name, description, reward_id, stars_required } = req.body;
  const stars = Number(stars_required);

  if (
    !task_name?.trim() ||
    !description?.trim() ||
    !Number.isInteger(stars) ||
    !reward_id
  ) {
    return res.status(400).json({
      message:
        "Invalid or missing data in request body. Please ensure all field are correctly entered and the stars required quantity is a number value.",
    });
  }

  try {
    const rewardExists = await knex("rewards")
      .select("id")
      .where("id", reward_id)
      .first();

    if (!rewardExists) {
      return res.status(400).json({ message: "Invalid reward_id" });
    }

    const newTask = {
      reward_id,
      task_name,
      description,
      stars_required: stars,
    };

    const [newTaskId] = await knex("tasks").insert(newTask);

    res.status(201).json({ id: newTaskId, ...newTask });
  } catch (error) {
    res.status(500).send(`Error creating new task: ${error}`);
  }
};

export { index, getSingleTask, createTaskItem };
