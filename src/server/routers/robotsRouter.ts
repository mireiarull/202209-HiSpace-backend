import "../../loadEnvirontment.js";
import express from "express";
import {
  getRobots,
  getRobotById,
  addRobot,
  deleteRobotbyId,
  updateRobot,
} from "../controllers/robotsControllers.js";
import auth from "../middlewares/auth.js";

// eslint-disable-next-line new-cap
const robotsRouter = express.Router();

robotsRouter.get("/", getRobots);
robotsRouter.get("/:id", getRobotById);
robotsRouter.post("/create", addRobot);
robotsRouter.delete("/delete/:idRobot", auth, deleteRobotbyId);
robotsRouter.put("/update/", updateRobot);

export default robotsRouter;
