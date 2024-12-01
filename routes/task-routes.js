import * as taskController from "../controllers/task-controller.js";

import express from "express";
const router = express.Router();

router.route("/").get(taskController.index).post(taskController.createTaskItem);

router.route("/:id").get(taskController.getSingleTask);

export default router;
