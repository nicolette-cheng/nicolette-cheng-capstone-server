import * as rewardController from "../controllers/reward-controller.js";

import express from "express";
const router = express.Router();

router
  .route("/")
  .get(rewardController.index)
  .post(rewardController.createRewardItem);

router.route("/:id").get(rewardController.getSingleReward).put(rewardController.editRewardItem);

export default router;
