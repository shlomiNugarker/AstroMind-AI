import { Router } from "express";
import {
  addCoach,
  getCoaches,
  updateCoach,
  deleteCoach,
} from "../controllers/coach.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["coach", "super_admin"]),
  getCoaches
);
router.post(
  "/add",
  authMiddleware,
  roleMiddleware(["coach", "super_admin"]),
  addCoach
);
router.put(
  "/:coachId",
  authMiddleware,
  roleMiddleware(["coach", "super_admin"]),
  updateCoach
);
router.delete(
  "/:coachId",
  authMiddleware,
  roleMiddleware(["coach", "super_admin"]),
  deleteCoach
);

export default router;
