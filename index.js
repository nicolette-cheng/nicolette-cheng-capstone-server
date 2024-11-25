import express from "express";
import cors from "cors";
import "dotenv/config";

import taskRoutes from "./routes/task-routes.js";
import rewardRoutes from "./routes/reward-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/rewards", rewardRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
