import { Router } from "express";
import {
  addTrainee,
  getMyTrainees,
  updateTrainee,
  deleteTrainee,
} from "../controllers/trainee.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["coach", "trainee"]),
  addTrainee
);

router.get(
  "/my-trainees",
  authMiddleware,
  roleMiddleware(["coach", "trainee"]),
  getMyTrainees
);

router.put(
  "/:traineeId",
  authMiddleware,
  roleMiddleware(["coach", "trainee"]),
  updateTrainee
);

router.delete(
  "/:traineeId",
  authMiddleware,
  roleMiddleware(["coach", "trainee"]),
  deleteTrainee
);

export default router;
