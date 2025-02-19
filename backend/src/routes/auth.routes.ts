import { Router } from "express";
import {
  forgotPassword,
  resetPassword,
  getAuthenticatedUser,
  registerTrainee,
  registerCoach,
  registerSuperAdmin,
  loginUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

const router = Router();

router.post("/login", loginUser);

router.post(
  "/register/trainee",
  authMiddleware,
  roleMiddleware(["coach"]),
  registerTrainee
);

router.post(
  "/register/coach",
  authMiddleware,
  roleMiddleware(["super_admin"]),
  registerCoach
);

router.post("/register/superadmin", registerSuperAdmin);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

router.get("/me", getAuthenticatedUser);

export default router;
