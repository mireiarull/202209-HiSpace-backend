import "../../loadEnvirontment.js";
import express from "express";
import {
  getRobots,
  getRobotById,
  addRobot,
  deleteRobotbyId,
  updateRobot,
} from "../controllers/robotsControllers.js";
import app from "../app.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

robotsRouter.get("/", getRobots);
robotsRouter.get("/:id", getRobotById);
robotsRouter.post("/create", addRobot);
robotsRouter.delete("/delete/:idRobot", deleteRobotbyId);
robotsRouter.put("/update/", updateRobot);

export default robotsRouter;
