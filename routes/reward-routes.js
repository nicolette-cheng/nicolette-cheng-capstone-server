import * as rewardController from "../controllers/reward-controller.js";

import express from "express";
const router = express.Router();

router.route("/").get(rewardController.index);

export default router;
