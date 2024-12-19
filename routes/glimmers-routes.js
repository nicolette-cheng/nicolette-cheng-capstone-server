import * as glimmerController from "../controllers/glimmer-controller.js";

import express from "express";
const router = express.Router();

router.route("/").get(glimmerController.index).post(glimmerController.createGlimmerItem);

router.route("/:id").get(glimmerController.getSingleGlimmer).put(glimmerController.editGlimmerItem);

export default router;
